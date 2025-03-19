const express=require("express")
const connectToDb = require("./Config/db")
const app=express()
const cors=require('cors')
const userRoute=require("./Routes/userRoute")
const postRoute=require("./Routes/postRoute")
require("dotenv").config({path:"./Config/.env"})

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api",userRoute)
app.use("/post",postRoute)

app.listen(process.env.PORT,()=>{
   console.log('server is running on port ')
})