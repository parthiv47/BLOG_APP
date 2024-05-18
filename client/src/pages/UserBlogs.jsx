import React,{useEffect, useState} from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard'
import {useSelector} from "react-redux"

const UserBlogs = () => {
    const [blogs,setBlogs]= useState([])
    const [bloglength,setlength]=useState()
    const isLogin=useSelector(state=>state.isLogin)
    console.log(isLogin)
    const getUserBlogs=async()=>{
     try{
        const id= localStorage.getItem('userId')
        console.log(id)
        const {data} = await axios.get(`http://localhost:8080/api/v1/blog/user-blog/${id}`)
        if(data?.success)
        {
        
            setBlogs(data?.userblog.blogs)
            setlength(data?.userblog.blogs.length)
           
        }
        }
        catch(error)
        {
            console.log(error)
        }
    }
    useEffect(()=>{
        getUserBlogs()
    },[])
  return (
    <div>
    { bloglength>0 ? (
        blogs.map((blog,index) => (
          <BlogCard
             key={index}
            id={blog?._id}
            isUser={true}
            title={blog?.title}
            description={blog?.description}  
            image={blog?.image}
            username={blog?.user?.username}
            time={blog?.createdAt}
          />
        ))) : (<h1 style={{textAlign:"center"}}>You have not created any blog</h1>)}
    </div>
  )
}

export default UserBlogs
