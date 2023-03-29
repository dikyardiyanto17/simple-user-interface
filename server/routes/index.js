const express = require('express')
const router = express.Router()
const { Tasks } = require('../controllers/tasks')

router.post('/login', Tasks.newTask)
router.post('/register', Tasks.newTask)
router.get('/users', Tasks.findTasks)
router.get('/users/:id', Tasks.findTask)
router.patch('/users/:id', Tasks.updateTask)
router.delete('/users/:id', Tasks.deleteTask)


module.exports = router
