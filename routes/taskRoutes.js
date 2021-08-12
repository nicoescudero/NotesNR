const express = require('express');
const router = express.Router();
const task = require('../models/task');

router.get('/', async (req, res) => {
    const data = await task.find();
    res.send(data);
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const newTask = new task({ title, description });
    await newTask.save();
    res.send({ status: 'task saved' });
})

router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    const newTask = { title, description };
    await task.findByIdAndUpdate(req.params.id, newTask);
    res.send({ status: 'Udated task' });
})

router.delete('/:id', async (req, res) => {
    await task.findByIdAndDelete(req.params.id);
    res.send({ status: 'task deleted' });
})

router.get('/:id', async (req, res) => {
    const data = await task.findById(req.params.id);
    res.json(data);
});

module.exports = router;