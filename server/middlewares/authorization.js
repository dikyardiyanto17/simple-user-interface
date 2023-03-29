const {User, Category, Product} = require('../models')

const authorization = async (req, res, next) => {
    try {
        const {productId} = req.params
        const {authorId} = req.user
        const user = await User.findByPk(authorId)
        if (user.role == "Admin") next()
        else {
            const product = await Product.findByPk(productId)
            if (!product) throw {name: "is not exist", message: "Product is not exist"}
            if (authorId == product.authorId) next()
            else throw {name: "previlege", message: `You're not authorized to access this product`}
        }
    } catch (error) {next(error)}
}

module.exports = authorization