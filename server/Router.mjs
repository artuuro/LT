import Action from './Action';

export default class Router {
    constructor (server, routes) {
        this.server = server;
        this.routes = routes;
    }

    async init() {
        try {
            for (let route of this.routes) {
                const handler = new Action(route.controller, this.server);
                route.path = `/api/${route.path}`;
                route.handler = await handler[route.method.toLowerCase()];
                if (!route.handler) return this.server.log.error(`Method [${route.controller}]->(${route.method}) not found!`);
                await this.server.route(route);
                this.server.log.info(`Route [${route.path}] linked to [${route.controller}]->(${route.method})`);
            }
        } catch (error) {
            throw error; 
        }
    }
}