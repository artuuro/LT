import fastify from 'fastify';
import helmet from 'fastify-helmet';
import gracefulShutdown from 'fastify-graceful-shutdown';
import serveStatic from 'fastify-static';
import mongoose from 'fastify-mongoose';
import swagger from 'fastify-swagger';
import webpush from 'web-push';
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
            await self.server.register(helmet, self.config.HELMET);

            if (self.config.development) {
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
                await self.server.register(swagger, self.config.SWAGGER);
            }

            self.server.config = self.config;

            [{
                check: self.modules.has('DATABASE'),
                action: () => {
                    self.server.register(mongoose, self.config.MONGODB)
                        .after(() => {
                            self.database = new Database(self.server);
                            self.database.load();
                        });
                }
            }, {
                check: self.modules.has('STATIC'),
                action: () => {
                    self.server.register(serveStatic, self.config.STATIC);
                }
            }, {
                check: self.modules.has('API'),
                action: () => {
                    self.routing = new Router(self.server, self.config.routes);
                    self.routing.link();
                }
            }, {
                check: self.modules.has('WEBPUSH'),
                action: () => {
                    //console.log(self.server);
                    webpush.setVapidDetails(
                        `http://localhost:${self.config.PORT}`,
                        self.config.PUSH.PUBLIC,
                        self.config.PUSH.PRIVATE
                    );
                    self.server.push = (subscription, data) => webpush.sendNotification(subscription, data);
                }
            }, {
                check: (true),
                action: () => {
                    self.server.register(gracefulShutdown)
                        .after(() => {
                            self.server.gracefulShutdown(async (signal, next) => {
                                self.server.log.info(`Shutdown because of ${signal} event call.`);

                                if (self.modules.has('DATABASE')) {
                                    self.server.log.info(`Closing MongoDB connection..`);
                                    await self.database.connection.close();
                                    self.server.log.info(`Connection closed!`);
                                }

                                return next();
                            });
                        });
                }
            }].map(item => item.check && item.action());


        } catch (error) {
            throw new Error(`Failed to load server`, error);
        }

    }

}