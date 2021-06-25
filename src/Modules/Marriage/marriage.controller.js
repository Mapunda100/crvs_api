const MarriageModel = require('./marriage.model')
const PersonModal = require('../Person/person.model')


module.exports = {
    register: async (req, res) => {
        try {
            const bridePersonId = req.body.brideDetails.brideId
            const groomPersonId = req.body.groomDetails.groomId

            await MarriageModel.create(req.body.marriageInfo)
            await PersonModal.updateOne({ _id: bridePersonId }, { ...req.body.brideDetails })
            await PersonModal.updateOne({ _id: groomPersonId }, { ...req.body.groomDetails })

            res.status(200).json({})
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },
    getOne: async (req, res) => {
        try {
            const { coupleType, userId } = req.query

            let filter = { brideId: userId }
            if (coupleType === 'groom') {
                filter = { groomId: userId }
            }
            const marriageData = await MarriageModel.findOne(filter)
                .populate('groomId')
                .populate('brideId')
            res.status(200).json(marriageData)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    // search: async (req, res) => {
    //     try {
    //         console.log(req.params)
    //         console.log(req.query)

    //         if (req.params.mode === 'soft') {
    //             let data = await PersonModel.find({
    //                 $or: [
    //                     { firstname: { $regex: req.query.firstname, $options: 'i' } },
    //                     { middlename: { $regex: req.query.middlename, $options: 'i' } },
    //                     { lastname: { $regex: req.query.lastname, $options: 'i' } }
    //                 ]
    //             })
    //                 .populate('birthInfo')
    //                 .populate('fatherid')
    //                 .populate('motherid')
    //             return res.status(200).json(data)
    //         } else {
    //             let data = await PersonModel.findOne({
    //                 firstname: req.query.firstname,
    //                 middlename: req.query.middlename,
    //                 lastname: req.query.lastname
    //             })
    //             if (!data)
    //                 return res.status(200).json([])
    //             return res.status(200).json([data])

    //         }
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json(error)
    //     }
    // },
    // delete: async (req, res) => {

    // },
    // update: async (req, res) => {

    // }
}