import { useState } from "react";
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import { authActions } from "../redux/store";

const Header = () => {
    const [value,setValue]=useState();
    let isLogin=useSelector(state=>state.isLogin)
    isLogin= isLogin ||localStorage.getItem('userId')
    const dispatch=useDispatch();
    const navigate=useNavigate()

    function handleLogout(){
        dispatch(authActions.logout()) 
        alert('User login Sucessfully')
        localStorage.setItem("userId","");
        navigate('/login')
    }
 
  return (
    
    <>
       {console.log(value)}
      <AppBar position="sticky">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h4">My Blog APP</Typography>
          </Link>
          {isLogin &&( <Box display={'flex'} marginLeft={'auto'} marginRight={'auto'}>
          <Tabs textColor="inherit"   value={value} onChange={(e,value)=>setValue(value)} >
           <Tab label="Blogs" sx={{fontSize: '1rem',    }}  LinkComponent={Link} to="/blogs"></Tab>
           <Tab label="My Blogs" sx={{fontSize: '1rem',    }}  LinkComponent={Link} to="/my-blogs"></Tab>
           <Tab label="Create Blog" sx={{fontSize: '1rem',    }}  LinkComponent={Link} to="/create-blog"></Tab>
          </Tabs>
          </Box>
          )}
            <Box display={"flex"} marginLeft="auto">
           {!isLogin &&(<>
            <Button
            variant="contained"
            sx={{ margin: 1, color: "black" ,background:'white'}}
            LinkComponent={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            sx={{ margin: 1, color: "black" ,background:'white' }}
            LinkComponent={Link}
            to="/register"
          >
            Register
          </Button>
            </>)}
            {isLogin &&(<Button sx={{ margin: 1, color: "black" ,background:'white' }} onClick={handleLogout}>Logout</Button>)}
          </Box>
         
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
