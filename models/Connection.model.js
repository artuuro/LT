import { connectionFn } from './functions';

export default (database, Schema) => {
    const schema = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        pushConfig: {
            type: Object,
            requied: false,
            default: false
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

    return database.model('Connection', schema);
};