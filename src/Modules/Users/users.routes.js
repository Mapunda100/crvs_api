const Router = require('express')
const router = new Router()

const userController = require('./users.controller')
// localhost:8500/user/register
router.post('/register',userController.register)
router.post('/login',userController.login)
// router.get('/test',userController.test)
// router.put
// router.patch
// router.delete

module.exports = router