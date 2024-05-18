const express =require('express');
const cors= require('cors');
const morgan=require('morgan');
const color=require('colors');
const dotenv=require('dotenv');
const connectDB = require('./config/db');

dotenv.config()
//routes import
const userRoutes=require("./routes/userRoutes")
const blogRoutes=require("./routes/blogRoutes")

//mongoconnect
connectDB();
//rest object
const app=express();

//middlewear
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/blog',blogRoutes);

const PORT=process.env.PORT ||8080

app.listen(PORT,()=>{
    console.log(`app listen on port ${8080} number`);
})
