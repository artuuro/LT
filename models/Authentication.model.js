export default (database, Schema) => {
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

    return database.model('Authentication', schema);
};