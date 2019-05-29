import { connectionFn } from './functions';

export default class {
    constructor (database, Schema) {
        const schema = new Schema({
            user: {
                type: Schema.Types.ObjectId, 
                ref: 'User'
            },
            isAlive: {
                type: Boolean,
                required: true,
                default: true
            },
            createdAt: {
                type: Date,
                required: true,
                default: new Date()
            },
            updatedAt: {
                type: Date,
                required: true,
                default: new Date()
            }
        }, {
            emitIndexErrors: true
        });

        schema.loadClass(connectionFn);

        const model = database.model('Connection', schema);
        return model;
    }
}