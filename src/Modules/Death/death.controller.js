const DeathModel = require('./death.model')

module.exports = {
    register: async (req, res) => {
        await DeathModel.create(req.body.personinfo)
            .then(() => res.status(201).json())
            .catch(error => res.status(500).json(error))
    },
    getDeaths: async (req, res) => {
        //tba
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