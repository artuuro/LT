export default class User {
    constructor(database, Schema) {
        let schema = new Schema({
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


        schema.methods.authenticate = async (credentials) => {
            console.log(credentials);
            return false;
        };

        const model = database.model('User', schema);

        model.on('error', async error => {
            const { name, code } = error;
            if (name == 'MongoError' && code == 11000) {
                delete error.code;
                error.message = 'DUPLICATE_USERNAME';
                error.statusCode = 403;
            }
            return error;
        });

        return model;
    }
};
