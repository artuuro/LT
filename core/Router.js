import Handler from './Handler';
import * as Middleware from '../middlewares';

export default class {
    constructor(server, routes) {
        this.server = server;
        this.routes = routes;
    }

    assignMiddlewares(route) {
        this.server.log.info(`Route [${route.path}] apply middlewares [${route.middlewares}]`);
        route.beforeHandler = async (request, reply) => {
            let queue = [];

            for (const item of route.middlewares) {
                const instance = new Middleware[item](this.server, request, reply);

                this.server.log.info(`Queue middleware [${route.path}][${item}]`);
                queue.push(instance.handle());
            }

            this.server.log.info(`Executing [${queue.length}] middlewares.`);
            return Promise.all(queue);
        };
    }

    link() {
        for (let route of this.routes) {
            const handler = new Handler(route.controller, this.server);
            route.path = route.unique ? `/${route.path}` : `/api/${route.path}`;
            route.handler = handler[route.method.toLowerCase()];

            if (route.middlewares) this.assignMiddlewares(route);

            this.server.route(route);

            this.server.log.info(`Route [${route.path}] linked to [${route.controller}]->(${route.method})`);
        }
    }
}