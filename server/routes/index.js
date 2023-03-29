const express = require('express')
const router = express.Router()
const { Tasks } = require('../controllers/tasks')

router.post('/tugas', Tasks.newTask)
router.get('/tasks', Tasks.findTasks)
router.get('/tasks/:id', Tasks.findTask)
router.patch('/tasks/:id', Tasks.updateTask)
router.delete('/tasks/:id', Tasks.deleteTask)


module.exports = router
