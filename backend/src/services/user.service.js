const UserModel = require('../models/user.model');
const { v4: uuid } = require('uuid');

const afterQuery = (x) => { return x ? x.get({ plain: true }) : null };

const UserService = {
    getUserById: async (id) => {
        if (!id)
            return null;
        return await UserModel.findOne({ where: { id } }).then(afterQuery);
    },
    getUserByUsernameAndPassword: async (username, password) => {
        if (!username || !password)
            return null;
        return await UserModel.findOne({ where: { username, password }}).then(afterQuery);
    },
    createUser: async (username, password) => {
        if (!username || !password)
            return null;
        if (await UserModel.count({ where: { username } }) > 0)
            return null;
        return await UserModel.create({ id: uuid(), username, password }).then(afterQuery);
    }
};

(async () => {
    console.log(await UserModel.findAll());
})()

module.exports = UserService;
