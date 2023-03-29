const express = require('express')
const router = express.Router()
const { Users } = require('../controllers/users')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', Users.register)
router.post('/login', Users.login)
router.use(authentication)
router.get('/user', Users.findCurrentUser)
router.get('/users', Users.findUsers)
router.get('/users/:id', Users.findUser)
router.use(authorization)
router.put('/users/:id', Users.changeUserRole)
router.delete('/users/:id', Users.deleteUser)


module.exports = router
