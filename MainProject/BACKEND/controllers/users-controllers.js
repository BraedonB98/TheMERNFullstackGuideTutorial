const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Braedon',
        email: 'email@email.com',
        password: 'password'
    }
]


const getUsers = (req,res,next)=>{
    
};

const signup = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return(next(new HttpError('Invalid Inputs Passed Please try again', 422)))
    }
    const{name, email, password ,places}= req.body;

    let existingUser;
    try{
       existingUser = await User.findOne({email:email});
    }
    catch(error){
        return(next(new HttpError('Sign up failed, Could not access database', 500)));
    };

    if(existingUser){
        console.log(existingUser);
        return(next(new HttpError('Could not create user, email already in use'),422));
    }

    const createdUser = new User({
        name,
        email,
        password,
        imageUrl: 'https://www.14ers.com/photos/graystorreys/routes/rt_torr5.jpg',
        places
    });
    
    try{
        await createdUser.save();
    }
    catch(error){
        return(next(new HttpError('Creating user failed',500)));
    };

    res.status(201).json({user:createdUser.toObject({getters:true})})
};

const login = async (req,res,next)=>{
    const { email, password }= req.body;

    let existingUser;
    try{
       existingUser = await User.findOne({email:email});
    }
    catch(error){
        return(next(new HttpError('Login Failed,Could not access database', 500)));
    };

    if(!existingUser || existingUser.password !== password){
        return(next(new HttpError('Login Failed,invalid credentials', 401)));
    }

    //const identifiedUser = DUMMY_USERS.find(u=>u.email===email)
    //if(!identifiedUser||identifiedUser.password !== password ){
    //    return(next(new HttpError('Could not identify user, credentials seem to be wrong'),401));
    //}
    
    res.json({message: 'Logged in!'})
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;