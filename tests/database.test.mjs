export default class {
    constructor(instance) {
        this.database = instance.database;
    }

    someFailingCondition() {
        return false;
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
            check: await this.hasModels()
        }, {
            desc: 'is connected',
            check: this.checkConnection()
        }, {
            desc: 'will fail intentionally',
            check: this.someFailingCondition()
        }];
    }
}