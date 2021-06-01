const mongoose = require('mongoose')

const DeathSchema = mongoose.Schema({
    firstname: {
        type: String,
    },

    middlename: {
        type: String,
    },

    lastname: {
        type: String,
    },

    job: {
        type: String,
    },

    age: {
        type: String,
    },


    placeofdeath: {
        type: String,
    },

    typeofdeath: {
        type: String,
    },

    dateofbirth: {
        type: String,
    },

    causeofdeath: {
        type: String,
    },
    // location: {
    //     country: String,
    //     region: String,
    //     district: String,
    //     ward: String,
    //     street: String
    // },

    country: {
        type: String,
    },

    region: {
        type: String,
    },

    district: {
        type: String,
    },

    ward: {
        type: String,
    },

    street: {
        type: String,
    },

    personid: {
        type: String
    }
})

module.exports = mongoose.model('Deaths', DeathSchema)