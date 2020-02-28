const userService = require('../services/user');

module.exports = (User) => {
  User.list = async (req, res) => {
    let response;

    try {
      response = await userService.list();
    } catch (err) {
      throw err;
    }

    res.header('uptime', req.uptime);

    return response;
  };
};
