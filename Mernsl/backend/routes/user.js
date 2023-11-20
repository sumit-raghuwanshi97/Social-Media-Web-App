const express = require('express');
const { register, getProfile } = require("../controllers/user");
const { login } = require("../controllers/user");
const { updatePassword } = require("../controllers/user");
const {isAuthenticated} = require("../middlewares/auth");
const { followUser } = require("../controllers/user");
const { logout } = require("../controllers/user");
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(isAuthenticated,logout);
router.route('/updatePassword').put(isAuthenticated ,updatePassword);
router.route('/follow/:_id').post(isAuthenticated,followUser); 
router.route('/me').get(isAuthenticated,getProfile);
module.exports = router;
