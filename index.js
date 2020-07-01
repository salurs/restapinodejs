const express = require('express');
const dbConnection = require('./db/dbConnection');
//middleware
const errorMiddleware = require('./middleware/error');
//routers
const userRouter = require('./router/userRouter');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//db connection
dbConnection();

app.use('/api/users', userRouter);

app.get('/', (req,res)=>{
    res.json({"message":"Hello World"});
});

app.use(errorMiddleware);

app.listen(3000, _ =>{
    console.log('Server running...');
});