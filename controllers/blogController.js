const  mongoose  = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
//get all blogs
exports.getAllBlogsController=async(req,res)=>{
    try{
        const blogs= await blogModel.find({}).populate('user');
        console.log(blogs);
        if(!blogs)
        {
            return res.status(400).send({
                message:'blogs not found',
                success:false,
            })
        }
        return res.status(200).send({
            blogCount:blogs.length,
            message:'all blogs lists',
            success:true,
            blogs
        })

    }catch(error)
    {
        console.log(error);
        return res.status(500).send({
            message:'error getAllBlogsController callback',
            success:false,
            error
        })
    }

}

//get single blog
exports.getBlogByIdController=async(req,res)=>{
 try{
    const {id}=req.params;
    const blog=await blogModel.findById(id)
    if(!blog){
        return res.status(404).send({
            message:'blog not found',
            success:false,
        })
    }
    return res.status(200).send({
        
        message:'fetch single block',
        success:true,
        blog
    })

 }
 catch(error)
 {
    console.log(error);
    return res.status(500).send({
        message:'error while getting single blog..',
        success:false,
        error
    })

 }
}
//create a new blog
exports.createBlogController=async(req,res)=>{
    try{
        const {title,description,image,user}=req.body;
      
        //validation
        if( !title ||!description||!image||!user)
        {
            return res.status(400).send({
                message:'please provide all fields',
                success:false,
            })
        }
        const existinguser= await userModel.findById(user);
        if(!existinguser)
        {
            return res.status(404).send({
                message:'unable to find user',
                success:false,
            }) 
        }
        const newblog=new blogModel({title,description,image,user})
        const session=await mongoose.startSession();
        session.startTransaction()
        await newblog.save({session})
        existinguser.blogs.push(newblog)
        await existinguser.save({session});
        await session.commitTransaction();
        await newblog.save()
        return res.status(201).send({
            message:'New blog Created',
            success:true,
            newblog
        })


    }catch(error)
    {
        console.log(error);
        return res.status(500).send({
            message:'error while creating blog',
            success:false,
            error
        })
    }

}
// update a blog
exports.updateBlogController=async(req,res)=>{
    try{
        const {id}=req.params;
        const {title,description,image}=req.body;
        const blog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            message:'blog updated ',
            success:true,
             blog
        })

    }catch(error)
    {
        console.log(error);
        return res.status(500).send({
            message:'error while updating blog',
            success:false,
            error
        })

    }

}
//delete a blog
exports.deleteBlogController=async(req,res)=>{
 try{
// we can get blog information using populate method that is avaailable in mongoose.
 const blog=  await blogModel.findByIdAndDelete(req.params.id).populate("user")
   await blog.user.blogs.pull(blog)
   await blog.user.save();
    return res.status(200).send({ 
        message:'Deleted block',
        success:true,
    })

 }
 catch(error)
 {
    console.log(error);
    return res.status(500).send({
        message:'error while getting deleting blog.',
        success:false,
        error
    })

 }
}

exports.userBlogController= async(req,res)=>{

try{
    
    const userblog=await userModel.findById(req.params.id).populate('blogs')
    console.log(userblog);
    if(!userblog)
    {
        return res.status(404).send({
            message:'unable to find blog',
            success:false,
        }) 
    }
    return res.status(200).send({ 
        message:'user blog',
        success:true,
        userblog
    }) 

}catch(error)
{
    console.log(error);
        return res.status(500).send({
            message:'error while get user-blog',
            success:false,
            error
        })

}


}