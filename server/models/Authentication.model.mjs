export default class Authentication {
    constructor (database, Schema) {
        const schema = new Schema({
            user: {
                type: Schema.Types.ObjectId, 
                ref: 'User'
            },
            token: {
                type: String,
                required: true
            },
            expires: {
                type: Date,
                required: true
            },
            createdAt: {
                type: Date,
                required: true,
                default: new Date()
            }
        }, {
            emitIndexErrors: true
        });

        const model = database.model('Authentication', schema);
        return model;
    }
}