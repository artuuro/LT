export default class {
    async post(req) {
        const { Customer } = this.database.models;

        const instance = new Customer({ ...req.body });

        await instance.save();
        
        return JSON.stringify(instance);
    }
}