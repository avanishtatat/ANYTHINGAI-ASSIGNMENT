const { json } = require("express");
const Task = require("../models/Task");
const { hasPermission } = require("../utils/authorize");
const { VIEW_TASK, CREATE_TASK, UPDATE_TASK, DELETE_TASK } = require("../utils/constants");
const { validateTaskParams, validateTaskBody } = require("../utils/validation");

module.exports.getTasks = async (req, res) => {
  try {
    const permissionAllowed = await hasPermission(req.user.id, VIEW_TASK);
    if (!permissionAllowed) {
      return res.status(403).json({ message: "Forbidden request" });
    }

    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.getTask = async (req, res) => {
  try {
    const permissionAllowed = await hasPermission(req.user.id, VIEW_TASK);
    if (!permissionAllowed) {
      return res.status(403).json({ message: "Forbidden request" });
    }

    const validationResponse = validateTaskParams(req.params);
    if (!validationResponse.isValid) {
      return res.status(400).json({ message: validationResponse.message });
    }

    const task = await Task.findById(validationResponse.taskId);
    return res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.createTask = async (req, res) => {
  try {
    const permissionAllowed = await hasPermission(req.user.id, CREATE_TASK);
    if (!permissionAllowed) {
      return res.status(403).json({ message: "Forbidden request" });
    }

    const validationResult = validateTaskBody(req.body || {});
    if (!validationResult.isValid) {
      return res.status(400).json({ message: validationResult.message });
    }

    const { title, description = "" } = req.body;

    const newTask = await Task.create({ title, description, userId: req.user._id });

    return res.status(201).json({ message: 'Task successfully created', taskId: newTask._id });

  } catch (error) {
    console.error("Error while creating task", error)
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    const permissionAllowed = await hasPermission(req.user.id, UPDATE_TASK);
    if (!permissionAllowed) {
      return res.status(403).json({ message: "Forbidden request" });
    }

    const validationResponse = validateTaskParams(req.params);
    if (!validationResponse.isValid) {
      return res.status(400).json({ message: validationResponse.message });
    }

    const updatedTask = await Task.findByIdAndUpdate(validationResponse.taskId, {
      $set: req.body
    }, { new: true, runValidators: true })

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask
    })
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const permissionAllowed = await hasPermission(req.user.id, DELETE_TASK);
    if (!permissionAllowed) {
      return res.status(403).json({ message: "Forbidden request" });
    }

    const validationResponse = validateTaskParams(req.params);
    if (!validationResponse.isValid) {
      return res.status(400).json({ message: validationResponse.message });
    }

    await Task.findByIdAndDelete(validationResponse.taskId);

    return res.status(200).json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
