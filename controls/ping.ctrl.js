export default class {
    async get(__request, reply) {
        const response = {
            message: 'PONG',
            development: this.config.development,
            time: new Date()
        };
        
        return JSON.stringify(response);
    }
}