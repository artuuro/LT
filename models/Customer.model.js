import { userFn } from './functions';

export default (database, Schema) => {
    const schema = new Schema({
        username: {
            type: String,
            unique: true,
            required: true,
            dropDups: true
        },
        password: {
            type: String,
            required: true
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

    schema.loadClass(userFn);

    const model = database.model('Customer', schema);

    model.on('error', async error => {
        const { name, code } = error;
        if (name == 'MongoError' && code == 11000) {
            delete error.code;
            error.message = 'ALREADY_TAKEN';
            error.statusCode = 403;
        }
        return error;
    });

    return model;
};

