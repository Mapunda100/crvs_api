const Router = require('express')
const router = new Router()

const marriageController = require('./marriage.controller')

// localhost:8500/deaths/register
router.post('/register', marriageController.register)
router.get('/all', marriageController.getAll)
router.get('/', marriageController.getOne)
// router.get('/getDeaths', marriageController.getDeaths)
// router.get('/findDeceased', deathController.)

module.exports = router
