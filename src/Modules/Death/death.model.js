const mongoose = require('mongoose')

const DeathSchema = mongoose.Schema({
    personid: {
        type: String,
        ref: 'Person',
        required: true,
        unique: true
    },
    placeofdeath: {
        type: String,
        enum: ['hospital', 'home', 'elsewhere'],
        required: true
    },

    typeofdeath: {
        type: String,
        enum: ['nature', 'not nature'],
        required: true
    },

    dateofdeath: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },

    causeofdeath: {
        type: String,
        required: true
    },
    location: {
        country: String,
        region: String,
        district: String,
        ward: String,
        street: String
    },
})

module.exports = mongoose.model('Deaths', DeathSchema)