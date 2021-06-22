const UserRoutes = require('./Modules/Users/users.routes')
const PersonRoutes = require('./Modules/Person/person.routes')
const DeathRoutes = require('./Modules/Death/death.routes')
const MarriageRoutes = require('./Modules/Marriage/marriage.routes')

module.exports = (app) => {
    app.use('/', UserRoutes)
    app.use('/person', PersonRoutes)
    app.use('/death', DeathRoutes)
    app.use('/marriage', MarriageRoutes)

}