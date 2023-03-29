const express = require('express')
const router = express.Router()
const { Users } = require('../controllers/users')

router.post('/register', Users.register)
router.post('/login', Users.login)
// router.get('/users', )
// router.get('/users/:id', )
// router.patch('/users/:id', )
// router.delete('/users/:id', )


module.exports = router
