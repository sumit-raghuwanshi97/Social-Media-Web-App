//importing user model 
const User = require('../models/user');


exports.register = async (req,res) => {

    try{

        const {name,email,password} = req.body ;

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json(
                {
                    success:false,
                    message : "User already exists",
                }
            );
        }

        user = await User.create({   
            name,
            email,
            password,
            avatar : { public_id : "sample_id", url : "sample_url"},
        });

        res.status(201).json({success:true, user});
    }
    catch(error){
        res.status(500).json({
            success : false,
            message : error.message,
        });
    }

};
//Login 
exports.login = async (req,res) => {
    try {

        const {email,password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user){
            res.status(400).json({
                success:false,
                message:"User does not exists",
            });
        }

        const isMatch = await user.matchPassword(password)

        if(!isMatch){
            res.status(400).json({
                success:false,
                message:"Incorrect Password",
            }); 
        }

        const token = await user.generateToken();

        res.status(200).cookie("token" , token).json({success:true,user,token});

    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        });
    }
};

//update password
exports.updatePassword = async(req,res) => {
    try {
        
    const {newPassword} = req.body;
    const user = await User.findById(req.user._id);
    user.password = newPassword;
    await user.save();
    
    return res.status(200)
    .json({
        success:true,
        message : "Password updated successfully",
    });

} catch (error) {
    
    return res.status(500)
    .json({
        success:false,
        message: error.message
    })
}
};

//follow and unfollow user 
exports.followUser = async (req, res) => {
    try {
  
      const userTofollow = await User.findById(req.params._id);
      const loggedInUser = await User.findById(req.user._id);
  
      if(!userTofollow){
        return res
        .status(404)
        .json({
          success:false,
          mesasge:"User not found",
        });
      }
      
      if(loggedInUser.following.includes(userTofollow._id ))
      {
        const indexfollowing = await loggedInUser.following.indexOf(userTofollow._id);
        loggedInUser.following.splice(indexfollowing,1);

        const indexfollower = await userTofollow.following.indexOf(loggedInUser._id);
        userTofollow.followers.splice(indexfollower,1);

        await loggedInUser.save();
        await userTofollow.save();

        return res.status(200)
        .json({
            success:true,
            mesasge:`${userTofollow.name} unfollowed successfully`,
        });
      }

      loggedInUser.following.push(userTofollow._id);
      userTofollow.followers.push(loggedInUser._id);
  
      await loggedInUser.save();
      await userTofollow.save();
  
      return res
      .status(200)
      .json({
        success:true,
        mesasge:`${userTofollow.name} followed successfully`,
      });
  
    } catch (error) {
      
      return res.status(404)
      .json({
        success:false,
        message: error.message
      });
    }
  };


  //logout
  exports.logout = async (req ,res) => {
    try {

        return res.status(400).cookie("token",null)
        .json({
            success:true,
            message:`${user.name} is logged out`
        });
     
    } catch (error) {
        
        return res
        .json({
            success:false,
            message:error.message
        });
    }
  };