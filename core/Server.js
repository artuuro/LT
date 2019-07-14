import fastify from 'fastify';
import swagger from 'fastify-swagger';
import webpush from 'web-push';
import POW from 'point-of-view';
import pug from 'pug';
import gracefulShutdown from 'fastify-graceful-shutdown';
import serveStatic from 'fastify-static';
import mongoose from 'fastify-mongoose';
import helmet from 'fastify-helmet';
import { Database, Router, Tester, config } from './';

export default class {
    constructor(params) {
        this.config = config(params);

        this.services = new Set(this.config.services);

        this.server = fastify({
            http2: this.config.HTTP2,
            https: this.config.SSL,
            logger: {
                prettyPrint: true
            },
            ignoreTrailingSlash: true
        });

        this.server.log.info(`Queued services: [${this.config.services.join(', ')}]`);
    }

    test() {
        if (this.config.test) {
            this.tester = new Tester(this);
            this.tester.run();
        }
    }

    registerServices() {

        this.server.config = this.config;

        this.server.register(helmet, this.config.HELMET);

        if (this.config.development) {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
            this.server.register(swagger, this.config.SWAGGER);
        }

        const registry = [{
            name: 'DATABASE',
            hook: () => {
                this.server.register(mongoose, this.config.MONGODB)
                    .after(() => {
                        this.database = new Database(this.server);
                        this.database.load();
                        this.server.log.info(`MongoDB connected`);
                    });
            }
        }, {
            name: 'STATIC',
            hook: () => {
                this.server.register(serveStatic, this.config.STATIC);
            }
        }, {
            // TODO:
            name: 'WEBPUSH',
            hook: () => {
                webpush.setVapidDetails(
                    `http://localhost:${self.config.PORT}`,
                    ...this.config.push
                );
                this.server.push = (subscription, data) => webpush.sendNotification(subscription, data);
            }
        },
        {
            name: 'PWA',
            hook: () => {
                this.server.register(POW, {
                    engine: {
                        pug: pug
                    },
                    includeViewExtension: true,
                    templates: 'templates',
                    options: this.config.PUG || {}
                });
            }
        },
        {
            name: 'API',
            hook: () => {
                this.routing = new Router(this.server, this.config.routes);
                this.routing.link();
            }
        }, {
            // always loaded by default
            name: false,
            hook: () => {
                this.server.register(gracefulShutdown);
            }
        }];

        for (const { name, hook } of registry) {
            if (this.services.has(name) || !name) hook();
        }


    }

    run() {
        this.registerServices();
        this.server.config.host = this.server.listen(this.config.PORT);
        this.test();
    }

}