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
    active:{
        type:Boolean,
        default:true
    },

    job: {
        type: String
    },
    religion: {
        type: String,
        enum: ['christian', 'muslim']
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },

    phonenumber: {
        type: String,
        unique: true
    },
    birthInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Birth'
    },
    finishedRegistration: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    // location: {
    //     country: String,
    //     region: String,
    //     ward: String,
    //     district: String,
    //     street:String
    // },
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

    // dateofbirth: {
    //     type: mongoose.Schema.Types.Date,
    // }
}, { timestamps: true })

module.exports = mongoose.model('Person', PersoninfoSchema)