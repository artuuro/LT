export default class userController {
    async post(req) {
        const { User } = this.models;
        
        const store = new User({ ...req.body });

        await store.save();

        return JSON.stringify(store);
    }
}