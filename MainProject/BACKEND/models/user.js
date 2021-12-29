const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true}, //unique makes searching for an email significantly faster but also has to be unique
    password:{type:String, required:true , minLength: 5},
    imageUrl:{type:String, required:true},
    places:[{type:mongoose.Types.ObjectId,required:true, ref: 'Place'}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);