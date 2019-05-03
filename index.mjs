
import fastify from 'fastify';
import fastifyHelmet from 'fastify-helmet';
import fastifyStatic from 'fastify-static';
import fastifyMongoose from 'fastify-mongoose';
import fastifySwagger from 'fastify-swagger';
import fastifyNext from 'fastify-nextjs';
import { Router, Database, config } from './server';

const conf = config();

const server = fastify({
    http2: true,
    https: conf.SSL,
    logger: conf.development,
    ignoreTrailingSlash: true
});

const routing = new Router(server, conf.routes);

const run = async () => {
    try {
        await server.listen(conf.PORT);
        server.swagger();
    } catch (error) {
        server.log.error(error);
        process.exit(1);
    }
};

server.register(fastifyMongoose, conf.MONGODB).after(async () => {
    const loader = new Database(server);
    await loader.load();
    server.models = loader.models;
});

server.register(fastifyHelmet, conf.HELMET);
server.register(fastifyStatic, conf.STATIC);
server.register(fastifySwagger, conf.SWAGGER);
server.register(fastifyNext, {
    dev: conf.development
}).after(() => {
    server.next('/');
});

(async () => {
    await routing.init();
    await run();
})();
