const jwt = require("jsonwebtoken");
const responseHandler = require("../helpers/responseHandler");

const auth = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    !token && responseHandler(res, 401, "TOKEN MISSING");
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      req.user = decoded;
      next();
      if (err) {
        return new Error(err.message);
      }
    });
  } catch (err) {
    responseHandler(res, 500, err.message);
  }
};

module.exports = auth;
