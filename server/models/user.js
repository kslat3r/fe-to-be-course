const userService = require('../services/user');

module.exports = (User) => {
  User.list = async () => {
    try {
      return await userService.list();
    } catch (err) {
      throw err;
    }
  };
};
