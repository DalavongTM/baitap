const express = require('express');

const taskControllers = require('../controllers/task-controller');

const router = express.Router();


router.get('/', taskControllers.getAllTask);

router.post('/', taskControllers.createTask);

router.patch('/:pid', taskControllers.updateTask);

router.patch('/isComplete/:pid', taskControllers.updateTaskIsComplete);

router.delete('/:pid', taskControllers.deleteTask);

module.exports = router;