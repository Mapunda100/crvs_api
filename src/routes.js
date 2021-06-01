const UserRoutes = require('./Modules/Users/users.routes')
const PersonRoutes = require('./Modules/Person/person.routes')
const DeathRoutes = require('./Modules/Death/death.routes')

module.exports = (app) => {
    app.use('/', UserRoutes)
    app.use('/person', PersonRoutes)
    app.use('/death', DeathRoutes)

}