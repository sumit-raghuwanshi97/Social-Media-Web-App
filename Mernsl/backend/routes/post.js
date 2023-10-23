const express = require('express');
const {createPost} = require('../controllers/post');
const { isAuthenticated } = require("../middlewares/auth");
const { likeAndUnlikePost } = require("../controllers/post");
const { commentOnPost } = require("../controllers/post");
const { deletePost } = require("../controllers/post");
const { getPostOfFollowing } = require("../controllers/post");
const router = express.Router();

//create Post
router.route("/post/upload").post(isAuthenticated, createPost);

//like Post
router.route("/post/:_id").post(isAuthenticated, likeAndUnlikePost).delete(isAuthenticated,deletePost); 

//comment on Post
router.route("/post/comment/:_id").post(isAuthenticated, commentOnPost);

//get Post of following
router.route("/post/following").get(isAuthenticated,getPostOfFollowing);


module.exports = router ;
 






