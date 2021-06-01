const mongoose = require('mongoose')
const { seedRoles, seedSuperAdmin } = require('./seeder')

const dbURI = 'mongodb://localhost:27017/crvs'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = () => {
    console.log('db initializing')
    var db = mongoose.connection
    db.on('error', (error) => {
        console.log(error)
        console.log('db connection error')
    })

    db.once('open', () => {
        seedRoles()
        seedSuperAdmin()
        console.log('db connected successfully')
    })
}
