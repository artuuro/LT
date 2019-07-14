export default class {
    async get() {
        const response = {
            message: 'PONG',
            development: this.config.development,
            time: new Date()
        };
        
        return JSON.stringify(response);
    }
}