const { Schema, model } = require('mongoose');

const toughtsSchema = new Schema({
    thoughtText: { 
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});
const reactionSchema = new Schema(
    {
        reactionId: { 
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: { 
            type: String,
            required: true,
            maxLength: 280
        },
        username: { 
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
        }
}, 
{ 
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);
users.virtual("reactionCount").get(function() {
    return this.reaction.lenght;
});

const Thought = models("Thought", thoughts);

module.exports = Thought;
