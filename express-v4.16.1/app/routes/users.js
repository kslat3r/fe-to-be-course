const express = require('express');
const router = express.Router();
const userService = require('../services/user');
const createError = require('http-errors');

router.get('/users', async (req, res, next) => {
  let users;

  try {
    users = await userService.list();
  } catch (e) {
    res.send(createError(500));

    return;
  }

  res.set({ uptime: req.app.locals.uptime });
  res.json(users);
});

module.exports = router;
