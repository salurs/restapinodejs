
const User = require('../models/userModel');
const createError = require('http-errors');
const bcrypt = require('bcrypt');

const getAllUsers = async (req,res,next)=>{
    try {
        const users = await User.find({});
        if(users) return res.json({
            status: 'success',
            statusCode: 200,
            data:users,
            message:"Listed"
        });
        res.json({
            status: 'success',
            statusCode: 200,
            data:users,
            message:"No Item"
        });
    } catch (error) {
        throw createError(404, 'Not Found');
    }
};
const getCurrentUser = async (req,res,next)=>{
    res.json(req.user);
}
const updateCurrentUser = async (req,res,next)=>{
    delete req.body.createdAt;
    delete req.body.updatedAt;

    if(req.body.hasOwnProperty('password'))
        req.body.password = await bcrypt.hash(req.body.password, 10);
    const {error, value} = User.joiValidationUpdate(req.body);
    if(error)
        return next(createError(400, error));
    try {
        const user = await User.findByIdAndUpdate({_id:req.user.id},req.body,{new:true,runValidators:true,useFindAndModify:false});
        if(user) return res.json({
            status: 'success',
            statusCode: 200,
            data:user,
            message:"Updated"
        });
        throw createError(404, 'Not Found');
    } catch (err) {
        next(createError(400,err));
    }
}
const deleteCurrentUser = async (req,res,next)=>{
    try {
        const user = await User.findByIdAndDelete({_id:req.user._id});
        if(user) return res.json({
            status: 'success',
            statusCode: 200,
            data:user,
            message:"Deleted"
        });
        throw createError(404, 'Not Found');
    } catch (err) {
        next(createError(400,err));
    }
};
const getUser = async (req,res,next)=>{
    try {
        const user = await User.findById({_id:req.params.id});
        if(user) return res.json({
            status: 'success',
            statusCode: 200,
            data:user,
            message:"Found"
        });
        throw createError(404, 'Not Found');
    } catch (err) {
        next(createError(400,err));
    }
};
const addUser = async (req,res,next)=>{
    try {
        const user = new User(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        const {error, value} = user.joiValidation(req.body);
        if(error)
            return next(createError(400, error));
        const result = await user.save();
        res.json({
            status: 'success',
            statusCode: 200,
            data:result,
            message:"Created"
        });
    } catch (err) {
        next(createError(400,err));
    }
};
const updateUser = async (req,res,next)=>{
    delete req.body.createdAt;
    delete req.body.updatedAt;
    // delete req.body.password;
    if(req.body.hasOwnProperty('password'))
        req.body.password = await bcrypt.hash(req.body.password, 10);
    const {error, value} = User.joiValidationUpdate(req.body);
    if(error)
        return next(createError(400, error));
    try {
        const user = await User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true,useFindAndModify:false});
        if(user) return res.json({
            status: 'success',
            statusCode: 200,
            data:user,
            message:"Updated"
        });
        throw createError(404, 'Not Found');
    } catch (err) {
        next(createError(400,err));
    }
};
const deleteAll = async (req,res,next)=>{
    try {
        const users = await User.deleteMany({isAdmin:false});
        if(users) return res.json({
            status: 'success',
            statusCode: 200,
            data: users,
            message:"Deleted"
        });
        throw createError(404, 'Not Found');
    } catch (err) {
        next(err);
    }
};
const deleteUser = async (req,res,next)=>{
    try {
        const user = await User.findByIdAndDelete({_id:req.params.id});
        if(user) return res.json({
            status: 'success',
            statusCode: 200,
            data: user,
            message:"Deleted"
        });
        throw createError(404, 'Not Found');
    } catch (err) {
        next(err);
    }
};
const login = async (req,res,next)=>{
    try {
        const user = await User.isLogin(req.body.email, req.body.password);
        if(!user)
            throw createError(400,"err");
        const token = await user.generateToken();
        res.json({
            user,
            token
        });

    } catch (err) {
        next(createError(400,err));
    }
};
module.exports = {
    getAllUsers,
    getCurrentUser,
    updateCurrentUser,
    deleteCurrentUser,
    getUser,
    addUser,
    updateUser,
    deleteAll,
    deleteUser,
    login
}