const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
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
    }
},{timestamps:true});

const schema = Joi.object({
    name: Joi.string().min(3).max(50).trim(),
    userName: Joi.string().min(3).max(50).trim(),
    email: Joi.string().trim().email(),
    password: Joi.string().trim().min(5)
});

UserSchema.methods.joiValidation = (user)=>{
    schema.required();
    return schema.validate(user);
};
UserSchema.methods.toJSON = function(){
    const user = this.toObject();
    delete user._id;
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.__v;
    return user;
}
UserSchema.statics.joiValidationUpdate = (user)=>{
    return schema.validate(user);
};
const User = mongoose.model('User', UserSchema);


module.exports = User;