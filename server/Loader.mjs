import fastify from 'fastify';
import fastifyHelmet from 'fastify-helmet';
import fastifyStatic from 'fastify-static';
import fastifyMongoose from 'fastify-mongoose';
import fastifySwagger from 'fastify-swagger';
import { Database, Router, config } from './';

export default class {
    constructor(params) {
        this.config = config(params);
        this.modules = new Set(this.config.features);

        this.server = fastify({
            http2: this.config.HTTP2,
            https: this.config.SSL,
            logger: this.config.development,
            ignoreTrailingSlash: true
        });
        
        this.server.log.info({
            features: this.config.features
        });
    }

    async run() {
        try {
            await this.register();
            await this.server.listen(this.config.PORT);
            await this.server.swagger();
        } catch (error) {
            await this.server.log.error(error);
            return process.exit(1);
        }
    }

    async register() {
        const self = this;
        try {
            await self.server.register(fastifyHelmet, self.config.HELMET);

            if (self.config.development) {
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
                await self.server.register(fastifySwagger, self.config.SWAGGER);
            }

            self.server.config = self.config;

            // Find out if module enabled & run conditionally:
            [{
                check: self.modules.has('DATABASE'),
                action: () => {
                    self.server.register(fastifyMongoose, self.config.MONGODB)
                    .after(() => {
                        self.database = new Database(self.server);
                        self.database.load();
                    });
                }
            }, {
                check: self.modules.has('STATIC'),
                action: () => {
                    self.server.register(fastifyStatic, self.config.STATIC);
                }
            }, {
                check: self.modules.has('API'),
                action: () => {
                    self.routing = new Router(self.server, self.config.routes);
                    self.routing.link();
                }
            }].map(item => item.check ? item.action() : false);

        } catch (error) {
            throw new Error(`Failed to load server`, error);
        }

    }

}