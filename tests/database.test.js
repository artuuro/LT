export default class {
    constructor(instance) {
        this.database = instance.database;
    }

    checkConnection() {
        return this.database.connection._readyState === 1;
    }

    async hasModels() {
        return Object.keys(this.database.models).length > 0;
    }

    async conditions() {
        return [{
            desc: 'has models loaded',
            test: await this.hasModels()
        }, {
            desc: 'is connected',
            test: this.checkConnection()
        }];
    }
}