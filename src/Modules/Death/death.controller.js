const DeathModel = require('./death.model')

module.exports = {
    register: async (req, res) => {
        await DeathModel.create(req.body.personinfo)
            .then(() => res.status(201).json())
            .catch(error => {
                console.log(error.message)
                res.status(500).json(error.message)
            })
    },
    getDeath: async (req, res) => {
        try {
            const { userId } = req.params
            const data = await DeathModel.findOne({ personid: userId })
                .populate('personid')
            console.log(data)
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const { userId } = req.params
            const data = await DeathModel.find()
                .populate('personid')
            console.log(data)
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    // fetchPerson: async (req, res) => {
    //     console.log(req.query)
    // await DeathModel.findOne({
    //     firstname: req.body.firstname,
    //     middlename: req.body.middlename,
    //     lastname: req.body.lastname
    // })
    // await PersoninfoModel.find({
    //     firstname: { $regex: req.query.firstname, $options: 'i' },
    //     middlename: { $regex: req.query.middlename, $options: 'i' },
    //     lastname: { $regex: req.query.lastname, $options: 'i' },
    // })
    //     .then(data => res.status(200).json({ data }))
    //     .catch(error => res.status(500).json(error))
    // },
}