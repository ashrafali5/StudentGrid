const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, "the intelligent investor");
    console.log(verify);
    next();
  } catch (err) {
    res.status(401).json({
      error: "invalid token",
    });
  }
};
