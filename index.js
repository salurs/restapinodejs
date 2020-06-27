const express = require('express');
const dbConnection = require('./db/dbConnection');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

dbConnection();

app.get('/', (req,res)=>{
    res.json({"message":"Hello World"});
});
app.get('/:id', (req,res)=>{
    console.log(req.query.sortBy);
    res.json({"id":req.params.id});
});
app.post('/', (req,res)=>{
    res.json(req.body);
});

app.listen(3000, _ =>{
    console.log('Server running...');
});