const responseHandler = require("../helpers/responseHandler");
const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password, image } = req.body;
    const user = await User.findOne({ email });
    user && responseHandler(res, 401, "User already exists");
    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY,
    ).toString();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });
    await newUser.save();
    responseHandler(res, 201, "User created");
  } catch (err) {
    responseHandler(res, 500, err.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && responseHandler(res, 401, "User does not exist");
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY,
    ).toString(CryptoJS.enc.Utf8);

    if (req.body.password !== decryptedPassword) {
      responseHandler(res, 401, "incorrect password");
    }

    const userToken = {
      id: user._id,
    };

    const token = jwt.sign(userToken, process.env.SECRET_TOKEN);

    const { password, ...others } = user._doc;

    responseHandler(res, 200, { ...others, token });
  } catch (err) {}
};

module.exports = { register, login };
