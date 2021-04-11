const User = require('../models/user.model');
const { v4: uuid } = require('uuid');

const afterQuery = (x) => { return x ? x.get({ plain: true }) : null };

class UserService {

    async getById (id) {
        if (!id)
            return null;
        return await User.findOne({ where: { id } }).then(afterQuery);
    }

    async getByCreds (username, password) {
        if (!username || !password)
            return null;
        return await User.findOne({ where: { username, password }}).then(afterQuery);
    }

    async create (username, password) {
        if (!username || !password)
            return null;
        if (await User.count({ where: { username } }) > 0)
            return null;
        return await User.create({ id: uuid(), username, password }).then(afterQuery);
    }
}

const userService = new UserService();

module.exports = userService;
