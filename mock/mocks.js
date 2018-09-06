const userList = require('./stubs/user-list.json');

module.exports = [
  {
    hostname: 'localhost',
    port: 1080,
    stubs: [
      userList
    ]
  }
];
