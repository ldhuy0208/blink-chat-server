const conversationController = require("../controllers/conversationController");

const conversationRouter = require("express").Router();

conversationRouter.post("", conversationController.create);

module.exports = conversationRouter;
