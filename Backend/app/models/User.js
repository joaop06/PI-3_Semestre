const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date_birth: {
        type: Date,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },
    deleted_at: {
        type: Date,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {
    User,
    userSchema
}
