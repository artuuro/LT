import fastify from 'fastify';
import fastifyHelmet from 'fastify-helmet';
import fastifyStatic from 'fastify-static';
import fastifyMongoose from 'fastify-mongoose';
import fastifySwagger from 'fastify-swagger';
import { Router, Database, config } from './';

export default class Loader {
    constructor (args) {
        this.config = config(args);
        this.mode = new Set(this.config.MODE);

        this.server = fastify({
            http2: true,
            https: this.config.SSL,
            logger: this.config.development,
            ignoreTrailingSlash: true
        });

        this.routing = new Router(this.server, this.config.routes);
        
        this.register();
    }

    async run() {
        try {
            if (this.mode.has('API'))   
                await this.routing.link();

            await this.server.listen(this.config.PORT);

            if (this.config.development) 
                await this.server.swagger();

        } catch (error) {
            await this.server.log.error(error);
            return process.exit(1);
        }
    }
    
    register () {
        this.server.config = this.config;
        this.server.register(fastifyHelmet, this.config.HELMET);

        this.server.register(fastifyMongoose, this.config.MONGODB).after(async () => {
            this.database = new Database(this.server);
            await this.database.load();
        });

        if (this.mode.has('STATIC')) this.server.register(fastifyStatic, this.config.STATIC);
        if (this.config.development) this.server.register(fastifySwagger, this.config.SWAGGER);
    }

}