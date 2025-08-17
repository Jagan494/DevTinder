const moongose = require('mongoose');

//error MissingSchemaError: Schema hasn't been registered for model "User".
//fix the error by adding the below line

const connectionRequestSchema = moongose.Schema({
    fromUserId:{
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
        index: true,
    },
    toUserId:{
        type: moongose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type: String,
        enum: ['ignored', 'interested', 'accepted','rejected'],
    }
},{
    timestamps: true // Automatically add createdAt and updatedAt fields
})
const ConnectionRequest = moongose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequest;

