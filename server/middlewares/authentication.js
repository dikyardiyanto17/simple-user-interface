const { decodeToken } = require("../helpers/jwt");
const {User} = require('../models')

const authentication = async(req, res, next) => {
    const {access_token} = req.headers
    try {
        if (!access_token) throw {name: "Invalid token", message: "Token is invalid"}
        const payload = decodeToken(access_token)
        const user = await User.findByPk(payload.id)
        if (!user) throw {name: "Invalid token", message: "Token is invalid"}
        req.user = {authorId: user.id}
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication