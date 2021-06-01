const PersonModel = require('./person.model')
const BirthModel = require('../Birth/birth.model')

module.exports = {
    register: async (req, res) => {
        try {
            const newPerson = await PersonModel.create(req.body.personalInformations)
            const birth = await BirthModel.create({ ...req.body.birthinfo, personid: newPerson._id })
            console.log(birth)
            res.status(200).json({})
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },
    // fetchPersonsFather: async (req, res) => {
    //     await PersonModel.findOne({
    //         firstname: req.body.fatherinfo.firstname,
    //         middlename: req.body.fatherinfo.middlename,
    //         lastname: req.body.fatherinfo.lastname
    //     })
    //         .then(data => res.status(200).json({ data }))
    //         .catch(error => res.status(500).json(error))
    // },
    fetchPersonsParent: async (req, res) => {
        // console.log(req.body)
        await PersonModel.findOne({
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname
        })
            .then(data => res.status(200).json({ data }))
            .catch(error => res.status(500).json(error))
    },
    registerParent: async (req, res) => {
        try {
            console.log('Registered Parent Temp')
            console.log(req.body)
            // const userId = await generateId(req.body.personinfo.dateofbirth)

            const person = await PersonModel.create(req.body.personinfo)
            console.log(person)
            res.status(200).json(person)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    finPersonByNames: async (req, res) => {
        console.log(req.query)
    
        await PersonModel.find({
            firstname: { $regex: req.query.firstname, $options: 'i' },
            middlename: { $regex: req.query.middlename, $options: 'i' },
            lastname: { $regex: req.query.lastname, $options: 'i' },
        })
            .then(data => {
                console.log(data)
                res.status(200).json(data)
            }).catch(error => {
                console.log(error)
            })
    },
    getOne: async (req, res) => {

    },
    search: async (req, res) => {

    },
    delete: async (req, res) => {

    },
    update: async (req, res) => {

    }
}