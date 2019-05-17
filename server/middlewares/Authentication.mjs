class Authentication {
    constructor (server, request, reply) {
        this.server = server;
        this.request = request;
        this.reply = reply;

        this.allow = true; // remove this
    }

    async handle() {
        // change this
        if (this.allow) return true;

        const error = new Error('Authentication required');
        error.statusCode = 403;

        throw error;
    }
}

export default Authentication;