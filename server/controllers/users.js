const { hashPassword, comparePassword } = require("../helpers/bcryptjs");
const { encodeToken } = require("../helpers/jwt");
const User = require("../schema/User");

class Users {
  static async register(req, res, next) {
    try {
      const { name, password } = req.body;
      const isExist = await User.findOne({name})
      if (isExist?.name){
        throw {name: "Registered", message: "Users with name " + name + " is already registered" }
      }
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
      const encodedToken = {id: user._id}
      const access_token = encodeToken(encodedToken)
      res.status(201).json({access_token, role: user.role});
    } catch (error) {
      next(error);
    }
  }

  static async findUsers (req, res, next){
    try {
      const data = await User.find().select('name role')
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async findUser (req, res, next){
    try {
      const {id} = req.params
      const data = await User.findById(id).select('name role')
      if(!data?.name){
        throw {name: 'User Not Found', message: 'User is not exist'}
      }
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async changeUserRole (req, res, next){
    try {
      const {role} = req.body
      const {id} = req.params
      if (!role){
        throw {name: "Bad Request", message: "Role is not selected"}
      }
      const data = await User.findById(id).select('name role')
      if(!data?.name){
        throw {name: 'User Not Found', message: 'User is not exist'}
      }
      await User.findByIdAndUpdate(id, {role})
      return res.status(200).json({message: 'Success updating role'})
    } catch (error) {
      next(error)
    }
  }

  static async deleteUser (req, res, next){
    try {
      const {id} = req.params
      const user = await User.findById(id)
      if(!user?.name){
        throw {name: 'User Not Found', message: 'User is not exist'}
      }
      await User.findByIdAndDelete(id)
      return res.status(200).json({message: "Success deleting user"})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { Users };
