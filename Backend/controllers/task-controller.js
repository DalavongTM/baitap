const mongoose = require('mongoose')

const Task = require('../models/task');

const getAllTask = async(req, res, next) => {
    let ac;
    try {
        ac = await Task.find();
    } catch (err) {
        const error = new Error("could not find");
        return next(error);
    }
    res.json({ ac });
}
const createTask = async(req, res, next) => {

    const { name, isComplete } = req.body;

    const createdTask = new Task({
        name,
        isComplete,
    });
    try {
        await createdTask.save();
    } catch (err) {
        const error = new Error(
            'Creating Task failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({ Task: createdTask.toObject({ getters: true }) });
};
//update name
const updateTask = async(req, res, next) => {
    const { name } = req.body;
    const TaskId = req.params.pid;

    let TaskUpdate;
    try {
        TaskUpdate = await Task.findById(TaskId);
    } catch (err) {
        const error = new Error(
            'Something went wrong, could not find a Task.',
            500
        );
        return next(error);
    }

    TaskUpdate.name = name;
    try {
        await TaskUpdate.save();
    } catch (err) {
        const error = new Error(
            'Something went wrong, could not update Task.',
            500
        );
        return next(error);
    }

    res.status(200).json({ Task: TaskUpdate.toObject({ getters: true }) });
};
//upadate complete true/false
const updateTaskIsComplete = async(req, res, next) => {
    const { isComplete } = req.body;
    const TaskId = req.params.pid;

    let TaskUpdate;
    try {
        TaskUpdate = await Task.findById(TaskId);
    } catch (err) {
        const error = new Error(
            'Something went wrong, could not find a Task.',
            500
        );
        return next(error);
    }

    TaskUpdate.isComplete = isComplete;
    try {
        await TaskUpdate.save();
    } catch (err) {
        const error = new Error(
            'Something went wrong, could not update Task.',
            500
        );
        return next(error);
    }

    res.status(200).json({ Task: TaskUpdate.toObject({ getters: true }) });
};
const deleteTask = async(req, res, next) => {
    const TaskId = req.params.pid;

    let TaskDelete;
    try {
        TaskDelete = await Task.findById(TaskId);
    } catch (err) {
        const error = new Error(
            'Something went wrong, could not delete Task.',
            500
        );
        return next(error);
    }

    if (!TaskDelete) {
        const error = new Error('Could not find Task for this id.', 404);
        return next(error);
    }

    try {
        await TaskDelete.remove();
    } catch (err) {
        const error = new Error(
            'Something went wrong, could not delete Task.',
            500
        );
        return next(error);
    }

    res.status(200).json({ message: 'Deleted Task.' });
};

exports.getAllTask = getAllTask;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.updateTaskIsComplete = updateTaskIsComplete;
exports.deleteTask = deleteTask;