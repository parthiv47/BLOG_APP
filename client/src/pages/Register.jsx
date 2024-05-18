import { Box, Typography, TextField, Button } from "@mui/material";
import {useNavigate} from "react-router-dom"
import { useState } from "react";
import axios from "axios"
const Register = () => {
    const navigate=useNavigate()
    const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:""
    })
//handle input changes
   const handleChange=(e)=>{
   setInputs((prev)=>({
        
       ...prev,
       [e.target.name]:e.target.value, 
    }))

   }

   //form handle
   const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      const { data }=  await axios.post('http://localhost:8080/api/v1/user/register',{
        username: inputs.name,
        email: inputs.email,
        password: inputs.password
      });
      if(data.success)
      {
        alert('User register Sucessfully')
        navigate("/login");
      }


    }
    catch(error)
    {
        console.log(error)
    }
   }
   
  return (
    <>
       <form onSubmit={handleSubmit}>
      <Box
        maxWidth={450}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        margin="auto"
        marginTop={5}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        borderRadius={5}
      >
        <Typography
          variant="h4"
          padding={3}
          textAlign={"center"}
          sx={{ textTransform: "uppercase" }}
        >
          Register
        </Typography>
        <TextField
          
          placeholder="name"
          value={inputs.name}
          onChange={handleChange}
    
          name="name"
          margin="normal"
          type={"text"}
          required
        ></TextField>
        <TextField
         
          value={inputs.email}
          onChange={handleChange}
          
          placeholder="email"
          name="email"
          margin="normal"
          type={"email"}
          required
        ></TextField>
        <TextField
        
          value={inputs.password}
          onChange={handleChange}
          placeholder="password"
          name="password"
          margin="normal"
          type={"password"}
          required
        ></TextField>

        <Button
          sx={{ borderRadius: 3, marginTop: 3 }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        <Button sx={{ borderRadius: 3, marginTop: 3 }} color="primary" onClick={()=>navigate('/login')}>
          Already registered ? please login
        </Button>
      </Box>
      </form>
    </>
  );
};

export default Register;
