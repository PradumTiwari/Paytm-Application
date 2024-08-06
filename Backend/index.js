const express=require('express');
const bodyParser=require('body-parser');
const {connect} =require('./config/database');
const app=express();
const User =require('./models/User');
const cors=require('cors');
const router=require('./routes/index');
app.use(bodyParser.json());

app.use(cors());
app.use('/api/v1',router);
app.listen(3000,async()=>{
    console.log('Server is running on Port 3000');
    await connect();
    console.log('Database connected');
    const user=await User.create({
        username:'Pradum',
        firstName:'Pradum',
        password:"Tiwari@123",
        
        lastName:'Tiwari',
       
    })

    
})