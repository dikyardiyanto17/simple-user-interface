const { hashPassword, comparePassword } = require("../helpers/bcryptjs");
const { encodeToken } = require("../helpers/jwt");
const User = require("../schema/User");

class Users {
  static async register(req, res, next) {
    try {
      const { name, password } = req.body;
      if (!name) {
        throw { name: "Bad Request", message: "Name is required" };
      }
      if (!password) {
        throw { name: "Bad Request", message: "Password is required" };
      }
      const hashedPasswordUser = hashPassword(password);
      await User.create({ name, password: hashedPasswordUser, role: "Staff" });
      return res.status(201).json({ message: "Success Created Staff" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { name, password } = req.body;
      if (!name) {
        throw { name: "Bad Request", message: "Name is empty" };
      }
      if (!password) {
        throw { name: "Bad Request", message: "Password is empty" };
      }
      const user = await User.findOne({ name });
      if (!user) {
        throw { name: "Invalid", message: "Invalid Name/Password" };
      }
      let isValidPassword = comparePassword(password, user.password)
      if (!isValidPassword) {
        throw { name: "Invalid", message: "Invalid Name/Password" };
      }
      const encodedToken = {id: user._id, role: user.role}
      const access_token = encodeToken(encodedToken)
      res.status(201).json(access_token);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { Users };
