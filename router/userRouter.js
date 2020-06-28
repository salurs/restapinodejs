// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const User = require('../models/userModel');


router.get('/', async (req,res)=>{
    try {
        const users = await User.find({});
        if(users) return res.json({"data":users,"message":"List"});
        res.json({"data":users,"message":"Empty list"});
    } catch (error) {
        res.status(400).json({"error":err,"message":"Something wrong"});
    }
});

router.get('/:id', (req,res)=>{
    res.json({"message":"get user "+req.params.id});
});

router.post('/', async (req,res)=>{
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.json({"data":result,"message":"Saved"});
    } catch (err) {
        res.status(400).json({"error":err,"message":"Something wrong"});
    }
});

router.patch('/:id', async (req,res)=>{
    try {
        const user = await User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true});
        if(user) return res.json({"data":user,"message":"Updated"});
        res.status(404).json({"data":null,"message":"Not found"});
    } catch (err) {
        res.status(400).json({"error":err,"message":"Something wrong"});
    }
});

router.delete('/:id', async (req,res)=>{
    try {
        const user = await User.findByIdAndDelete({_id:req.params.id});
        if(user) return res.json({"data":user,"message":"User deleted"});
        res.status(404).json({"message":"Not found"});
    } catch (err) {
        res.status(400).json({"error":err,"message":"Something wrong"});
    }
});


module.exports = router;