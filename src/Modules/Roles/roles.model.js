const mongoose = require('mongoose')

const RolesSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Roles', RolesSchema)