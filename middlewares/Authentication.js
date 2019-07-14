class Authentication {
    constructor (server) {
        this.server = server;
        this.allow = true;
    }

    async handle(req) {
        this.server.log.info(req.headers);

        if (this.allow) return true;

        const error = new Error('MISSING_AUTH');
        error.statusCode = 403;

        throw error;
    }
}

export default Authentication;