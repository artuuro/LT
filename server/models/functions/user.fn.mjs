import jwt from 'jsonwebtoken';

export default class userFn {
    static token(user, key) {
        return jwt.sign(user, key, { expiresIn: '24h' });
    }

    static checkExistence(username) {
        return this.findOne({ username });
    }
}