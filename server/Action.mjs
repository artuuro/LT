import * as control from './controllers';

export default class Action {
    constructor (name, server) {
        if (!control[name]) return server.log.error(`Controller [${name}] not found`);
        return new control[name](server);
    }
};