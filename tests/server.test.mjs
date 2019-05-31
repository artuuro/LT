import 'isomorphic-unfetch';

export default class {
    constructor(instance) {
        this.config = instance.config;
    }

    async canPing() {
        const request = await fetch(`${this.config.host}/api/ping`);
        const response = await request.json();
        return response.message === 'PONG';
    }

    async conditions() {
        const canPing = await this.canPing();
        return [{
            desc: 'can ping',
            check: canPing
        }];
    }
}