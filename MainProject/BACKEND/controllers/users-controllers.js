const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req,res,next)=>{
    let users;
    try{
        users= await User.find({}, '-password');//isnt this going to be a massive array for any real social media website. obviously for this small project demonstration its fine but in future might be good to find a better way
    } 
    catch(error)
    {
        return(next(new HttpError('Failed to get Users, Please try again', 500)))
    }
    res.json({users: users.map(user=>user.toObject({getters:true}))})
};

const signup = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return(next(new HttpError('Invalid Inputs Passed found by expressValidator Please try again', 422)))
    }
    const{name, email, password }= req.body;

    let existingUser;
    try{
       existingUser = await User.findOne({email:email});
    }
    catch(error){
        return(next(new HttpError('Sign up failed, Could not access database', 500)));
    };

    if(existingUser){
        //console.log(existingUser);
        return(next(new HttpError('Could not create user, email already in use'),422));
    }

    const createdUser = new User({
        name,
        email,
        password,
        imageUrl: 'https://www.14ers.com/photos/graystorreys/routes/rt_torr5.jpg',
        places:[]
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