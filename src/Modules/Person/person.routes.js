const Router = require('express')
const router = new Router()
const personController = require('./person.controller')
const PersonModel = require('./person.model')

// localhost:8500/person/
router.post('/register', generateId, personController.register)
router.delete('/delete', personController.delete)
router.put('/update', personController.update)
router.get('/search', personController.search)
router.get('/', personController.getAll)
router.get('/withgender/:gender', personController.getByGender)
router.get('/countUsers', personController.countUsers)


router.get('/findByNames', personController.finPersonByNames)
// router.post('/father', personController.fetchPersonsFather)
router.post('/parent', personController.fetchPersonsParent)
router.post('/registerParent', generateParentId, personController.registerParent)

module.exports = router


async function generateId(req, res, next) {
    // console.log(req.body)
    const userid = await PersonModel.countDocuments() + 1;
    const dateofbirth = req.body.birthinfo.dateofbirth
    req.body.personalInformations._id = `${dateofbirth}-000${userid}`;
    next()   
}

async function generateParentId(req, res, next) {
    console.log(req.body)
    const userid = await PersonModel.countDocuments() + 1;
    const dateofbirth = req.body.personinfo.dateofbirth
    req.body.personinfo._id = `${dateofbirth}-000${userid}`;
    next()   
}