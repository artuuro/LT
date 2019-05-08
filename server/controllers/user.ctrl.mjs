import {} from 'crypto';

export default class userController {
    async post(req) {
        const { User } = this.models;
        
        const instance = new User({ ...req.body });

        await instance.save();

        return JSON.stringify(store);
    }
}