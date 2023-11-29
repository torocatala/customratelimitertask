const simpleAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader === process.env.AUTH_SECRET) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

module.exports = simpleAuth;