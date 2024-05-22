const userModel=require("../models/userModel");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const registerController=async(req,res)=>{
    try{
        const existingUser=await userModel.find({
            email:req.body.email
        })
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'User Exist Already',
            })
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        req.body.password=hashedPassword
        const user=new userModel(req.body)
        await user.save()
        return res.status(201).send({
            success:true,
            message:'User Registration Successfully',
            user,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Register API',
            error
        })
    }
};
const loginController=async(req,res)=>{
    try{
        const User=await userModel.fineOne({email:req.body.email})
        if(!User){
            return res.status(404).send({
                success:false,
                message:'Invalid Credentials',
            })
        }
        if(User.role !==req.body.role){
            return res.status(500).send({
                success:false,
                message:'Role Does not Match',
            })
        }
        const comparePassword=await bcrypt.compare(req.body.password,User.password)
        if(!comparePassword){
            return res.status(500).send({
                success:false,
                message:'Invalid Credentials',
            })
        }
    
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
    return res.status(200).send({
        success:true,
        message:'Login Successfully', token, user
    });
} 
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Login API',
            error
        })
    }
};
const currentUserController=async(req,res)=>{
    try{
        const user=await userModel.findOne({_id:req.body.userId})
        return res.status(200).send({
            success:true,user,
            message:'User Fetched Successfully',
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,error,
            message:'Unable to Get Current User',
        })
    }
}
module.exports={registerController,loginController,currentUserController};