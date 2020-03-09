module.exports = (req, res, next) => {
  req.app.locals.uptime = process.uptime();

  next();
};
