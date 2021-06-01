const RolesModel = require("../src/Modules/Roles/roles.model")
const UsersModel = require("../src/Modules/Users/users.model")

module.exports = {
    seedRoles: async () => {
        const rolesCount = await RolesModel.countDocuments()
        if (rolesCount === 0) {
            const roles = [
                { name: 'Registrar', _id: '1' },
                { name: 'Admin', _id: '2' },
                { name: 'Super Admin', _id: '3' }
            ]
            await RolesModel.insertMany(roles)
        }
    },
    seedSuperAdmin: async () => {
        const usersCount = await UsersModel.countDocuments()
        if (usersCount === 0) {
            await UsersModel.create({
                firstname: 'grayson',
                lastname: 'mapunda',
                phonenumber: '0752317451',
                email: 'gray@gmail.com',
                password: '12345678',
                role: 3
            })
        }
    }
}