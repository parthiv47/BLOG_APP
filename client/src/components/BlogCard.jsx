import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import '../App.css'
import { Box, IconButton } from '@mui/material';
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function BlogCard({title,description,image,username,time,id,isUser}) {
    console.log(username)
    const navigate=useNavigate();

    const handleDelete=async()=>{
      try{
         const {data} =  await axios.delete(`http://localhost:8080/api/v1/blog/delete-blog/${id}`);
         if(data?.success)
         {
            alert("blog deleted successfully");
            navigate('/blogs')
           // window.location.reload();
         }
      } 
      catch(error)  
      {
        console.log(error)
      }
    }

    const handleEdit=()=>{
     navigate(`/blog-details/${id}`);
    }
  return (
   
    <Card className='card'  sx={{ width:"40%",margin:"auto", mt:2,padding:2,boxShadow:'5px 5px 10px #ccc' }}>
    {isUser && (
      <Box  display={'flex'} >
      <IconButton onClick={handleEdit} style={{ marginLeft:'auto'}}>
      <ModeEditIcon />
      </IconButton> 
      <IconButton  onClick={handleDelete}>
      <DeleteIcon/>
      </IconButton>
      </Box>
    )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        
        title={username}
        subheader={time}
      />
      
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
      <Typography variant="h6" color="text.secondary">
       Title :{title}
     </Typography>
        <Typography variant="body2" color="text.secondary">
         {description}
        </Typography>
      </CardContent>
     
    
    </Card>
  );
}