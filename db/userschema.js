const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
       
    },
    email:{
        type:String,
        required:true
      
    },
    phone:{
        type:Number,
        required:true
       
    },
    profession:{
        type:String,
        required:true
   
    },
    password:{
        type:String,
        required:true
    },
    messages:[
        {
            subject :{
                type:String,
            required:true
            },
            message : {
                type:String,
            required:true
            }
        }
    ],
    tokens:[
        {token:{
            type:String,
            required:true
        }
    }
]

})

// hashing the password
userSchema.pre('save', async function (next){
    console.log("hii");
        if (this.isModified('password')){
        this.password= await bcrypt.hash(this.password, 12) ;
    }
    next();
});

//GENERATION OF JWT TOKEN
userSchema.methods.generateAuthToken = async function (){
    try {
      let token =   await jwt.sign({_id : this._id} , process.env.SECRET_KEY)   ;
      this.tokens = this.tokens.concat({token : token}) ;
      await this.save();
      return token;
    } catch (error) {
        
    }
}

// STORING THE MESSAGE
userSchema.methods.addMessage = async function (subject, message){
    try {
      this.messages = this.messages.concat({subject ,message }) ;
      await this.save();
      return this.messages
    } catch (error) {
        console.log(error)
    }
}

//COLLECTION CREATION

const User = mongoose.model('USER' ,userSchema);
module.exports = User;