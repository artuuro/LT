import mongoose from 'mongoose';
import * as definitions from './models';

export default class Database {
    constructor(server) {
        this.server = server;
        this.connection = server.mongo.db;
        this.models = {};
    }

    async load() {
        for (let name of Object.keys(definitions)) {
            this.server.log.info(`Loaded model [${name}]`);
            this.models[name] = new definitions[name](this.connection, mongoose.Schema);
        }
    }
}