import Action from './Action';

export default class Router {
    constructor (server, routes) {
        this.server = server;
        this.routes = routes;
    }

    async link() {
        try {
            for (let route of this.routes) {
                const handler = new Action(route.controller, this.server);
                
                route.path = route.noprefix ? `/${route.path}` : `/api/${route.path}`;
                route.handler = await handler[route.method.toLowerCase()];

                await this.server.route(route);

                this.server.log.info(`Route [${route.path}] linked to [${route.controller}]->(${route.method})`);
            }
        } catch (error) {
            throw error; 
        }
    }
}