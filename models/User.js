const { Schema, model } = require('mongoose');

const users = new Schema({
    username: { 
        type: String,
        unique: true,
        required: "Username is required",
        trim: true
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [
        { 
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: "User"
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

users.virtual("friendCount").get(function() {
    return this.friends.lenght;
});

const User = model('User', users);

module.exports = User;