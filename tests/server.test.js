import 'isomorphic-unfetch';

export default class {
    constructor(instance) {
        this.server = instance.server;
        this.config = instance.config;
    }

    instanceExists() {
        return Boolean(this.server);
    }

    async canPing() {
        const request = await fetch(`${this.config.host}/api/ping`);
        const response = await request.json();
        return response.message === 'PONG';
    }

    async conditions() {
        return [{
            desc: 'instance exists',
            test: this.instanceExists()
        }, {
            desc: 'can ping',
            test: await this.canPing()
        }];
    }
}