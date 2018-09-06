module.exports = () => {
  return (req, res, next) => {
    req.uptime = process.uptime();

    next();
  };
};
