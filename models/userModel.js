const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength:3,
        maxlength:50
    },
    userName:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength:3,
        maxlength:50,
        lowercase:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{timestamps:true});

const schema = Joi.object({
    name: Joi.string().min(3).max(50).trim(),
    userName: Joi.string().min(3).max(50).trim(),
    email: Joi.string().trim().email(),
    password: Joi.string().trim().min(5),
    isAdmin:Joi.boolean()
});

UserSchema.methods.joiValidation = (user)=>{
    schema.required();
    return schema.validate(user,{abortEarly:false});
};
UserSchema.methods.toJSON = function(){
    const user = this.toObject();
    delete user._id;
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.__v;
    return user;
};
UserSchema.methods.generateToken = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},'secretKey',{expiresIn:'1h'});
    return token;
};
UserSchema.statics.joiValidationUpdate = (user)=>{
    return schema.validate(user);
};
UserSchema.statics.isLogin = async (email, password)=>{
    const {error, value} = schema.validate({email,password});
    if(error){
        throw createError(400, 'Validation Error');
    }
    const user = await User.findOne({email});
    if(!user){
        throw createError(400, 'Email or password incorrect');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw createError(400, 'Email or password incorrect');
    }
    return user;
};
const User = mongoose.model('User', UserSchema);


module.exports = User;