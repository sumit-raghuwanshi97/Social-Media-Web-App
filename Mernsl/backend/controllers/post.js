
const Post = require('../models/post');
const User = require('../models/user');

//create Post
exports.createPost = async (req,res) =>{
      try{

        const newPostData = {
            caption : req.body.caption,
            image : {
                public_id : "req.body.public_id",
                url : "req.body.url"
            },
            owner : req.user._id
        }  

        const newPost = await Post.create(newPostData);

        const user = await User.findById(req.user._id);
        user.posts.push(newPost._id);

        await user.save();

        res.status(201).json({
          success:true,
          post : newPost
        });
      }
      catch(error){
        res.status(200).json({
            success : false ,
            message : error.message
        });
      }
};

//like and unlike post 
exports.likeAndUnlikePost  = async (req,res) => {
 try {
  
  const post = await Post.findById(req.params._id);
  console.log(post);

  if(!post){
    return res.status(500).json({
      success:false,
      message : error.message,
    });
  }

  if(post.likes.includes(req.user._id)){

    const index = post.likes.indexOf(req.user._id);

    post.likes.splice(index,1);

    await post.save();

    return res.status(200).json({
      success: true,
      message:"Post Unliked",
    });

   }
  else{

  post.likes.push(req.user._id);

  await post.save();

  return res.status(200).json({
    success: true,
    message:"Post liked",
  });

}
  
 } catch (error) {

  res.status(500).json({
    success:false,
    message : error.message,
  });

 }


}


//comment on post 
exports.commentOnPost = async (req,res) => {
  try {
    //fetch post by id from parameters 
    const post = await Post.findById(req.params._id);

    //if post is not found handle that case
    if(!post)
    {
      return res.status(500).json({
        success : false,
        message : error.message,
      });
    }

    //create a new object for the new comment 
    const newComment = await {
      user : req.user._id,
      comment : req.body.comment,
    }
    
    //if newcomment is undefined due to some error 
    if(!newComment.comment) 
    return res.status(500)
    .json({
      success : false,
      message : "Comment is empty"
    });

    //add comment to the post 
    post.comments.push(newComment);
    //save the snapshot
    await post.save();
    
    //finally return with message
    return res.status(500).json({
      success : true,
      message : `Comment added to the post ${post.caption} of ${req.user.name}`
    });
    
  } catch (error) {
    
    return res.status(500).json({
      success : false,
      mesasge : error.message,
    });

  }
}


//delete post
exports.deletePost = async (req,res) => {

  try {

  const post = await Post.findById(req.params._id);

  if(!post){
    return res
    .status(404)
    .json({
      success : false,
      message : "post does not exits"
    });
  }

  if(post.owner.toString() !== req.user._id.toString()){
    return res
    .status(401)
    .json({
      success : false,
      message : "Unauthorized access"
    });
  }

  await post.deleteOne();
  const user = await User.findById(req.user._id);

  const index = user.posts.indexOf(req.params._id);
  user.posts.slice(index,1);

  await user.save();

  return res
    .status(200)
    .json({
      success : true,
      message : "Post deleted",
    });


} catch (error) {
  return res
  .status(401)
  .json({
    success : false,
    message : error.message,
  });
}
};

//get posts of following 
exports.getPostOfFollowing = async (req,res) =>{
  try {
    
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      owner : {
        $in: user.following,
      }
    }
    );
    
    return res
    .status(200)
    .json({
      success:true,
      posts,
    });


  } catch (error) {
    
    return res
    .status(404)
    .json({
      success:false,
      message:error.message
    });
  }
};
