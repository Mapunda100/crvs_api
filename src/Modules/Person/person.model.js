const mongoose = require('mongoose')

const PersoninfoSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    firstname: {
        type: String
    },

    middlename: {
        type: String
    },

    lastname: {
        type: String
    },

    gender: {
        type: String
    },

    phonenumber: {
        type: String,
        unique: true
    },
    birthInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Birth'
    },
    finishedRegistration:{
        type:mongoose.Schema.Types.Boolean,
        default:false
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
    },

    fatherid: {
        type: String
    },

    motherid: {
        type: String
    },

    dateofbirth: {
        type: mongoose.Schema.Types.Date,
    }
})

module.exports = mongoose.model('Person', PersoninfoSchema)