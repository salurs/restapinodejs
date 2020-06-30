const express = require('express');
const dbConnection = require('./db/dbConnection');
const jwt = require('jsonwebtoken');
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

const example = ()=>{
    let pass = '12344321';
    let pass2 = '123443212';
    const token = jwt.sign(
        {
        _userId:'user id',
        isAdmin: true,
        isActive: true
        },
        pass,
        {
            expiresIn: '2h'
        }
    );
    const result = jwt.verify(token,pass);
    console.log(token);
    console.log(result);
};

example();

app.get('/', (req,res)=>{
    res.json({"message":"Hello World"});
});

app.use(errorMiddleware);

app.listen(3000, _ =>{
    console.log('Server running...');
});