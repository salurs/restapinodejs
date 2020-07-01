const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const createError = require('http-errors');

const auth = async (req, res, next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const result = jwt.verify(token, 'secretKey');
        const user = await User.findById({_id:result._id});
        if(!user)
            throw createError(404, 'Invalid token');
        req.user = user;
        next();
    } catch (err) {
        next(createError(404, 'Invalid token'));
    }
};

module.exports = auth;