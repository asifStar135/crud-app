const express = require('express');
const { register, login, loadUser, updateUser, deleteUser, getUsers, findUser, logout } = require('../controller/UserController');

const {isAuthenticated} = require("../middleware/authenticate");
const router = express.Router();

//  EVERY ROUTE IS ADDED WHERE THE API REQUESTS WILL CALLED...

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/account").put(isAuthenticated, logout);
router.route("/account").get(isAuthenticated, loadUser);
router.route("/update").put(isAuthenticated, updateUser);
router.route("/account").delete(isAuthenticated, deleteUser);
router.route("/allUser").get(isAuthenticated, getUsers);
router.route("/:id").get(isAuthenticated, findUser);

module.exports = router;