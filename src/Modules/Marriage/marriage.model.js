const mongoose = require('mongoose')

const MarriageSchema = mongoose.Schema({
    groomId: {
        type: String,
        required: true,
        ref: 'Person'
    },
    brideId: {
        type: String,
        required: true,
        ref: 'Person'
    },
    dateofmarriage: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    placeofmarriage: {
        type: String
    },
    location: {
        country: String,
        region: String,
        ward: String,
        district: String
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Marriage', MarriageSchema)