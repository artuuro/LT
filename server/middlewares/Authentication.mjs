class Authentication {
    constructor (server, request, reply) {
        this.server = server;
        this.request = request;
        this.reply = reply;

        this.allow = true; // false will throw an error on pages having this middleware
    }

    async handle() {
        // change this
        if (this.allow) return true;

        const error = new Error('Authorisation required');
        error.statusCode = 403;

        throw error;
    }
}

export default Authentication;