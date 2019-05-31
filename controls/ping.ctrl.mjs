export default class {
    async get() {
        return JSON.stringify({
            message: 'PONG',
            development: this.config.development,
            time: new Date()
        });
    }
}