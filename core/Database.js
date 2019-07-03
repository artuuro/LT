import mongoose from 'mongoose';
import * as definitions from '../models';

export default class {
    constructor(server) {
        this.server = server;
        this.models = {};
    }

    load() {
        try {
            for (let name of Object.keys(definitions)) {
                
                this.models[name] = definitions[name](this.server.mongo.db, mongoose.Schema);
                this.server.log.info(`Loaded model [${name}]`);
            }
        } catch (e) {
            throw new Error('Failed to load database models', e);
        }
    }
}