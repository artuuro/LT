import webpush from 'web-push';
import gracefulShutdown from 'fastify-graceful-shutdown';
import serveStatic from 'fastify-static';
import mongoose from 'fastify-mongoose';
import templating from 'point-of-view';
import pug from 'pug';
import { Database, Router } from './';

export default class {
    constructor(instance) {
        return [{
            name: 'DATABASE',
            hook: () => {
                instance.server.register(mongoose, instance.config.MONGODB)
                    .after(() => {
                        instance.database = new Database(instance.server);
                        instance.database.load();
                    });
            }
        }, {
            name: 'STATIC',
            hook: () => {
                instance.server.register(serveStatic, instance.config.STATIC);
            }
        }, {
            name: 'API',
            hook: () => {
                instance.routing = new Router(instance.server, instance.config.routes);
                instance.routing.link();
            }
        }, {
            name: 'WEBPUSH',
            hook: () => {
                webpush.setVapidDetails(
                    `http://localhost:${instance.config.PORT}`,
                    instance.config.PUSH.PUBLIC,
                    instance.config.PUSH.PRIVATE
                );
                instance.server.push = (subscription, data) => webpush.sendNotification(subscription, data);
            }
        }, {
            NAME: 'TEMPLATING',
            hook: () => {
                instance.server.register(templating, {
                    engine: {
                        pug: pug,
                        templates: 'client'
                    }
                });
            }
        }, {
            name: false,
            hook: () => {
                instance.server.register(gracefulShutdown)
                    .after(() => {
                        instance.server.gracefulShutdown(async (signal, next) => {
                            instance.server.log.info(`${signal}`);

                            await instance.server.close();

                            if (instance.modules.has('DATABASE')) {
                                instance.server.log.info(`Closing MongoDB connection..`);
                                await instance.database.connection.close();
                                instance.server.log.info(`Connection closed!`);
                            }

                            return next();
                        });
                    });
            }
        }];
    }
}