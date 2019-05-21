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

            // might need config at routes?
            self.server.config = self.config;

            const conditions = [{
                check: self.modules.has('DATABASE'),
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

                    const registerNext = async () => {
                        return new Promise((resolve, reject) => {
                            return self.server.register(fastifyNext, {
                                dev: self.config.development,
                                dir: './app'
                            }).after(() => {
                                if (!self.server.next) {
                                    reject();
                                }
                                self.server.next('/*', (app, req, reply) => {
                                    app.handleRequest(req.req, reply.res);
                                });
                                resolve();
                            });
                        });
                    }

                    await registerNext();
                    self.server.log.info(`PWA Attached`);
                }
            }, {
                check: self.modules.has('API'),
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