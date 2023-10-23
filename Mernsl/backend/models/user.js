const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required : [true, "Please enter a name"],
    },

    avatar : {
        public_id : String,
        url : String
    },

    email : {
        type:String,
        required : [true, "Please enter a email"],
        unique : [true, "Email already exists"],
    },
    
    password : {
        type :String,
        required : [true , "Please enter a password"],
        minlength : [6, "Password must be atleast 6 characters"],
        select : false, // when we access data of user password will not be selected
    },

    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "post",
        }
    ],

    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
        }
    ],

    following : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
        }
    ]
});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10);
    }
    next(); 
});


userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = function(){
    return jwt.sign({_id : this._id},process.env.JWT_SECRET);
}

module.exports = mongoose.model('user' , userSchema);