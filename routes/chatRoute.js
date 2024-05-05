const express = require('express');
const { sendMessage, getAllMessages, deleteChat, reactToMessage } = require('../controller/ChatController');

const {isAuthenticated} = require("../middleware/authenticate");
const router = express.Router();

//  EVERY ROUTE IS ADDED WHERE THE API REQUESTS WILL CALLED...
router.route("/sendMsg/").post(isAuthenticated, sendMessage);
router.route("/getAllMsg/:id").get(isAuthenticated, getAllMessages);
router.route("/deleteMsg/").delete(isAuthenticated, deleteChat);
router.route("/reactMsg/").put(isAuthenticated, reactToMessage);

module.exports = router;