const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const config = require("../config/database");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");
  try {
    const decoded = await promisify(jwt.verify)(token, config.SECRET);
    const { sub } = decoded;

    req.user = {
      role: sub,
    };
     next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
};
