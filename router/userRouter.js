// const express = require('express');
// const router = express.Router();
const router = require('express').Router();


router.get('/', (req,res)=>{
    res.json({"message":"get users list"});
});

router.get('/:id', (req,res)=>{
    res.json({"message":"get user "+req.params.id});
});

router.post('/', (req,res)=>{
    res.json(req.body);
});

router.patch('/:id', (req,res)=>{
    res.json({"message":"update user "+req.body.name+' '+req.body.surname+' '+req.body.age});
});

router.delete('/:id', (req,res)=>{
    res.json({"message":"delete user "+req.params.id});
});


module.exports = router;