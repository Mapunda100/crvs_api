const mongoose = require('mongoose')


const BirthSchema = mongoose.Schema({
    personid: {
        type: String,
        required: true,
        unique: true
    },

    dateofbirth: {
        type: String
    },

    typeofbirth: {
        type: String
    },

    placeofbirth: {
        type: String
    },

    country: {
        type: String
    },

    region: {
        type: String
    },

    district: {
        type: String
    },

    ward: {
        type: String
    },

    street: {
        type: String
    }
})

module.exports = mongoose.model('Birth', BirthSchema)


