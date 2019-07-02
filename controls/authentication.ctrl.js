export default class {
    async post(req) {
        const { User } = this.models;
        const { JWT_SIGN } = this.config;

        const instance = await User.checkExistence(req.body.username);

        if ( !instance ) {
            let error = new Error('NOT_FOUND');
            error.statusCode = 404;
            throw error;
        }

        const signature = await User.token(instance._doc, JWT_SIGN);
        const response = JSON.stringify({
            token: signature,
            ...instance._doc
        });

        return response;
    }
}