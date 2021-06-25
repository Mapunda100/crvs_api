const Router = require('express')
const router = new Router()

const deathController = require('./death.controller')

// localhost:8500/deaths/register
router.post('/register', deathController.register)
// router.get('/getDeaths', deathController.getDeaths)
router.get('/:userId', deathController.getDeath)
// router.get('/findDeceased', deathController.)

module.exports = router
