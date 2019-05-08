

export default class authenticationController {
    async post(req, res) {
        const { User } = this.models;
        const { JWT_SIGN } = this.config;

        const userObj = await User.checkExistence(req.body.username);

        if (!userObj) {
            let error = new Error('USER_NOT_FOUND');
            error.statusCode = 404;
            throw error;
        }

        const signature = await User.token(userObj._doc, JWT_SIGN);
        const response = JSON.stringify({
            token: signature,
            ...userObj._doc
        });

        return response;
    }
}