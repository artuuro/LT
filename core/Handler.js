import * as control from '../controls';

export default class {
    constructor (name, server) {
        if (!control[name]) 
            return server.log.error(`Controller [${name}] not found`);
            
        return new control[name](server);
    }
}