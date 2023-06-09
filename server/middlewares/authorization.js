const User = require("../schema/User");

const authorization = async (req, res, next) => {
    try {
        if(req.user.role == "Admin") next()
        else throw {name: "Authorization", message: "You're not authorized"}
    } catch (error) {next(error)}
}

module.exports = authorization