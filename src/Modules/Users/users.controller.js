const UserModel = require('./users.model')
var jwt = require('jsonwebtoken');

module.exports = {
    // localhost:8500/register
    register: async (req, res) => {
        console.log('registering user')
        console.log(req.body)
        await UserModel.create(req.body)
            .then(() => res.status(201).json())
            .catch(err => {
                if (err.code === 11000) {
                    return res.status(500).json(`Duplicate entry "${err.keyValue.email || err.keyValue.phonenumber}"`,)
                }
                return res.status(500).json(err.message)
            })
    },
    // localhost:8500/login
    login: async (req, res) => {
        try {
            console.log(req.body)
            let userValues = await UserModel.findOne({ email: req.body.email, password: req.body.password })
            console.log(userValues)
            if (userValues === null) {
                console.log('User does not exit')
                return res.status(401).json()
            }
            var token = jwt.sign({ userValues }, 's3cr3tkey');
            // console.log(token)

            return res.status(200).json({
                token, user: userValues
            })
        }
        catch (error) {
            console.log('Error has occurred')
            console.log(error)
            return res.status(500).json(error)
        }
    },
    test: async (req, res) => {
        //
        return res.status(200).json({ data: 'helow kipipa' })
    },
    fetchAll: async (req, res) => {
        let users = await UserModel.find()
        // console.log(users)
        return res.status(200).json(users)
    }
    /** 
     * other business logics concerning the user model
        other: async (req, res) => {

        }
     */
}