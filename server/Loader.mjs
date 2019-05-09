import fastify from 'fastify';
import fastifyHelmet from 'fastify-helmet';
import fastifyStatic from 'fastify-static';
import fastifyMongoose from 'fastify-mongoose';
import fastifySwagger from 'fastify-swagger';
import { Router, Database, config } from './';

export default class Loader {
    constructor (params) {
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

    async run () {
        try {
            await this.register();
            await this.server.listen(this.config.PORT);
            await this.server.swagger();
        } catch (error) {
            await this.server.log.error(error);
            return process.exit(1);
        }
    }

    async register () {
        this.server.config = this.config;
        this.server.register(fastifyHelmet, this.config.HELMET);
        this.server.register(fastifySwagger, this.config.SWAGGER);

        const conditions = [{
            check: this.modules.has('DATA'),
            action: async () => {
                return this.server.register(fastifyMongoose, this.config.MONGODB)
                .after(() => {
                    this.database = new Database(this.server);
                    this.database.load();
                });
            }
        }, {
            check: this.modules.has('STATIC'),
            action: async () => {
                return this.server.register(fastifyStatic, this.config.STATIC);
            }
        }, {
            check: this.modules.has('ROUTER'),
            action: async () => {
                this.routing = new Router(this.server, this.config.routes); 
                this.routing.link(); 
                return this.routing;
            }
        }];

        await conditions.map(async item => {
            if (item.check) {
                await item.action();
            }
        });

    }

}