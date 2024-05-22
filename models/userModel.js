const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    role:{
        type:String,
        required:[true,'Role Is Required'],
        enum:['admin','organisation','donar','hospital']
    },
    name:{
        type:String,
        required:function(){
            if(this.role==='user' || this.role==='admin'){
                return true
            }
            return false
        }
    },
    organisationName:{
        type:String,
        required:function(){
            if(this.role==='organisation'){
                return true
            }
            return false
        }
    },
    hospitalName:{
        type:String,
        required:function(){
            if(this.role==='hospital'){
                return true
            }
            return false
        }
    },
    email:{
        type:String,
        require:[true,'E-Mail Is Required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'PassWord Is Required']
    },
    website:{
        type:String
    },
    address:{
        type:String,
        required:[true,'Address Is Required']
    },
    phone:{
        type:String,
        required:[true,'Phone Number Is Required']
    },
},{timestamps:true});
module.exports=mongoose.model('donar',userSchema)