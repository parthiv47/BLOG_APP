const userModel = require("../models/userModel");
const bcrypt=require('bcrypt')
//get all users
exports.getAllUsers=async(req,res)=>{
    try{
       const users =await userModel.find({})
       console.log(users)
       console.log(Array.isArray(users)); 
       return res.status(200).send({
        userCount:users.length,
        message:'all users data',
        success:true,
        users
    })
   

    }catch(error)
    {
        console.log(error);
        return res.status(500).send({
            message:'error getAllusers callback',
            success:false,
            error
        })

    }
};
//create user register user
exports.registerController= async(req,res)=>{
    try{
        const {username,email,password}=req.body;
      
        //validation
        if( !username ||!email||!password)
        {
            return res.status(400).send({
                message:'please fill all fields',
                success:false,
            })
        }
        const existinguser=await userModel.findOne({email})
        if(existinguser)
        {
               return res.status(401).send({
                message:'user already exists',
                success:false,
            })
        }
        const hashedPassword=await bcrypt.hash(password,10)
       
        //save new user
        const user=new userModel({username,email,password:hashedPassword})
        await user.save()
        return res.status(201).send({
            message:'New user Created',
            success:true,
            user
        })


    }catch(error)
    {
        console.log(error);
        return res.status(500).send({
            message:'error in register callback',
            success:false,
            error
        })
    }

};
//login
exports.loginController=async(req,res)=>{
    try{
        const {email,password}=req.body
        //validation
        if(!email ||!password)
        {
            return res.status(401).send({
                message:'please fill all fields',
                success:false,
            })

        }
        const user=await userModel.findOne({email})
        if(!user)
        { return res.status(200).send({
            message:'Email is not registered',
            success:false,
        })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            return res.status(401).send({
                message:' Invalid username or password',
                success:false,
            })
        }
        return res.status(200).send({
            message:'login successfully',
            success:true,
            user
         })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).send({
            message:'error in register callback',
            success:false,
            error
        })

    }
};

