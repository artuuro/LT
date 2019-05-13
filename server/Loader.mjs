import fastify from 'fastify';
import fastifyHelmet from 'fastify-helmet';
import fastifyStatic from 'fastify-static';
import fastifyMongoose from 'fastify-mongoose';
import fastifySwagger from 'fastify-swagger';
import fastifyNext from 'fastify-nextjs';
import { Database, Router, config } from './';

export default class Loader {
    constructor(params) {
        this.config = config(params);
        this.modules = new Set(this.config.modules);

        this.server = fastify({
            http2: true,
            https: this.config.SSL,
            logger: this.config.development,
            ignoreTrailingSlash: true
        });

        this.server.log.debug(this.module);
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
            self.server.config = self.config;

            await self.server.register(fastifyHelmet, self.config.HELMET);
            await self.server.register(fastifySwagger, self.config.SWAGGER);

            const conditions = [{
                check: self.modules.has('DATA'),
                action: async () => {
                    return self.server.register(fastifyMongoose, self.config.MONGODB)
                        .after(() => {
                            self.database = new Database(self.server);
                            self.database.load();
                        });
                }
            }, {
                check: self.modules.has('STATIC'),
                action: async () => {
                    return self.server.register(fastifyStatic, self.config.STATIC);
                }
            }, {
                check: self.modules.has('PWA'),
                action: async () => {
                    return self.server.register(fastifyNext, {
                        dev: self.config.development,
                        dir: './app'
                    }).after(() => {
                        self.server.log.info(`PWA attached`);
                        self.server.next('/*', (app, req, reply) => {
                            app.handleRequest(req.req, reply.res);
                        });
                    });                
                }
            }, {
                check: self.modules.has('ROUTER'),
                action: async () => {
                    self.routing = new Router(self.server, self.config.routes);
                    self.routing.link();
                    return self.routing;
                }
            }];

            await conditions.map(async item => {
                if (item.check) {
                    await item.action();
                }
            });



        } catch (error) {
            throw new Error(`Failed to load server`, error);
        }



    }

}