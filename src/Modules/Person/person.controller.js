const PersonModel = require('./person.model')
const BirthModel = require('../Birth/birth.model')

module.exports = {
    register: async (req, res) => {
        try {
            const birth = await BirthModel.create({ ...req.body.birthinfo, personid: req.body.personalInformations._id })
            const newPerson = await PersonModel.create({ ...req.body.personalInformations, birthInfo: birth._id })
            console.log(birth)
            // console.log(newPerson)
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
        try {
            console.log(req.params)
            console.log(req.query)
            const gender = req.params.type === 'father' ? 'male' : 'female'
            // console.log(gender)

            // if (req.params.mode === 'soft') {
            let data = await PersonModel.find({
                gender,
                $or: [
                    { firstname: { $regex: req.query.firstname, $options: 'i' } },
                    { middlename: { $regex: req.query.middlename, $options: 'i' } },
                    { lastname: { $regex: req.query.lastname, $options: 'i' } }
                ]
            })
            console.log(data)
            return res.status(200).json(data)
            // }
            //  else {
            //     let data = await PersonModel.findOne({
            //         firstname: req.query.firstname,
            //         middlename: req.query.middlename,
            //         lastname: req.query.lastname
            //     })
            //     if (!data)
            //         return res.status(200).json([])
            //     return res.status(200).json([data])

            // }
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
        // console.log(req.body)
        // await PersonModel.findOne({
        //     firstname: req.body.firstname,
        //     middlename: req.body.middlename,
        //     lastname: req.body.lastname
        // })
        //     .then(data => res.status(200).json({ data }))
        //     .catch(error => res.status(500).json(error))
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
    getAll: async (req, res) => {
        await PersonModel.find({})
            .populate('birthInfo')
            .then(data => {
                console.log(data)
                return res.status(200).json(data)
            }).catch(error => {
                console.log(error)
                return res.status(500).json(error)
            })
    },

    getByGender: async (req, res) => {
        const { gender } = req.params
        await PersonModel.find({
            gender,
        })
            .populate('birthInfo')
            .then(data => {
                return res.status(200).json(data)
            }).catch(error => {
                return res.status(500).json(error)
            })
    },

    countUsers: async (req, res) => {
        const men = await PersonModel.countDocuments({ gender: { $regex: 'male', $options: 'i' } })
        const female = await PersonModel.countDocuments({ gender: { $regex: 'female', $options: 'i' } })
        return res.status(200).json({
            female, men, total: female + men
        })
    },

    getOne: async (req, res) => {

    },
    search: async (req, res) => {
        try {
            console.log(req.params)
            console.log(req.query)

            if (req.params.mode === 'soft') {
                let data = await PersonModel.find({
                    $or: [
                        { firstname: { $regex: req.query.firstname, $options: 'i' } },
                        { middlename: { $regex: req.query.middlename, $options: 'i' } },
                        { lastname: { $regex: req.query.lastname, $options: 'i' } }
                    ]
                })
                    .populate('birthInfo')
                    .populate('fatherid')
                    .populate('motherid')
                return res.status(200).json(data)
            } else {
                let data = await PersonModel.findOne({
                    firstname: req.query.firstname,
                    middlename: req.query.middlename,
                    lastname: req.query.lastname
                })
                if (!data)
                    return res.status(200).json([])
                return res.status(200).json([data])

            }
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },
    delete: async (req, res) => {

    },
    update: async (req, res) => {

    }
}