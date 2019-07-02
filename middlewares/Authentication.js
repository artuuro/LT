class Authentication {
    constructor (server, __request, __reply) {
        this.server = server;
        this.allow = true;
    }

    async handle() {
        // change this
        if (this.allow) return true;

        const error = new Error('Sign-in required');
        error.statusCode = 403;

        throw error;
    }
}

export default Authentication;