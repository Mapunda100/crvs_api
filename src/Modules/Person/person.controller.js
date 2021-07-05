const PersonModel = require('./person.model')
const BirthModel = require('../Birth/birth.model')
const DeathModel = require('../Death/death.model')

const moment = require('moment')

module.exports = {
    register: async (req, res) => {
        try {
            const birth = await BirthModel.create({ ...req.body.birthinfo, personid: req.body.personalInformations._id })
            await PersonModel.create({ ...req.body.personalInformations, birthInfo: birth._id, finishedRegistration: true })
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
            const birth = await BirthModel.create({ personid: req.body.personinfo._id, dateofbirth: req.body.personinfo.dateofbirth })
            const person = await PersonModel.create({ ...req.body.personinfo, birthInfo: birth._id })

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
        await PersonModel.find({ active: true })
            .populate('birthInfo')
            .populate('motherid')
            .populate('fatherid')
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
            gender, active: true
        })
            .populate('birthInfo')
            .then(data => {
                return res.status(200).json(data)
            }).catch(error => {
                return res.status(500).json(error)
            })
    },

    countUsers: async (req, res) => {
        // const men = await PersonModel.countDocuments({ gender: { $regex: 'male', $options: 'i' } })
        // const female = await PersonModel.countDocuments({ gender: { $regex: 'female', $options: 'i' } })
        const men = await PersonModel.countDocuments({ gender: 'male', active: true })
        const female = await PersonModel.countDocuments({ gender: 'female', active: true })
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

    getChildrenYouthsElders: async (req, res) => {
        const youths = await BirthModel.countDocuments({
            dateofbirth: {
                $gte: moment().subtract(44, 'years'),
                $lte: moment().subtract(15, 'years')
            }
        })
        const childrens = await BirthModel.countDocuments({
            dateofbirth: {
                $gte: moment().subtract(14, 'years'),
                $lte: moment().subtract(0, 'years')
            }
        })
        const elders = await BirthModel.countDocuments({
            dateofbirth: {
                $lte: moment().subtract(45, 'years')
            }
        })
        const final = {
            childrens, youths, elders
        }
        console.log(final)
        return res.status(200).json(final)
    },

    birthVSDeath: async (req, res) => {
        const births = await PersonModel.countDocuments()
        const deaths = await DeathModel.countDocuments()
        const final = { births, deaths }
        return res.status(200).json(final)
    },

    delete: async (req, res) => {
        console.log("High coict")
        // console.log(req.body)
        console.log(req.params)
        const id = req.params.userid;
        PersonModel
            .findOneAndUpdate({ _id: id }, { active: false })
            .exec() // is this needed? https://mongoosejs.com/docs/api/model.html#model_Model-remove
            .then(data => {
                res.json(data);
            }).catch(error => {
                console.log(error);
            })
        // req.body.person.delete()
        // return res.status(200).json(response)

    },
    update: async (req, res) => {

    }
}