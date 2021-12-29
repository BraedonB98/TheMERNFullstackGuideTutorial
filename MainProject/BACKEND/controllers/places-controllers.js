const mongoose = require('mongoose');

const {validationResult} = require('express-validator');


const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');



const getPlaceById = async (req,res,next)=>{
    const placeId = req.params.pid; // because pid was used in the get /:pid this is the {pid: 'p1'}
    let place;
    try{
        place = await Place.findById(placeId);
    }
    catch(error){
        return(next(new HttpError('Could not find place in database', 500)));
    };
    if(!place){
        return(next(new HttpError('Place not in database', 404)));
    }
   

    res.json({place: place.toObject({getters:true})}); // = res.json({place: place}); //getters:true allows you to refer to _id by id
};

const getPlacesByUserId = async (req,res,next)=>{
    const userId = req.params.uid; // because uid was used in the get /:uid this is the {uid: 'p1'}
    //let places;
    let userWithPlaces
    try{
        userWithPlaces = await User.findById(userId).populate('places');
    }
    catch(error){
        return(next(new HttpError('Could not find place in database', 500)));
    };

    if(!userWithPlaces || userWithPlaces.places.length === 0){
        return next(new HttpError('Could not find a places for the provided user id.', 404));
    }

    res.json({places: userWithPlaces.places.map(place => place.toObject({getters:true}))}); // = res.json({place: place});
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return(next(new HttpError('Invalid Inputs Passed Please try again', 422)))
    }


    const {title,description,address,creator} = req.body;

    let coordinates; // if you declare in try catch block then its local and cant leave try block
    try{coordinates = await getCoordsForAddress(address);}
    catch(error){
        return(next(error));
    }
    
    const createdPlace = new Place({
        title,
        description,
        location: coordinates,
        address,
        imageUrl:'https://www.14ers.com/photos/graystorreys/routes/rt_torr5.jpg',
        creator
    });
  
    let user;

    try{
        user= await User.findById(creator);
    }
    catch(error){
        return(next(new HttpError('Creating place failed, issue accessing DB', 500)))
    }

    if(!user){
        return(next(new HttpError('Creating place failed, UserID not able to be located in DB', 404)))
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();//transactions allow you to perform multiple actions on a db where if one fails it reverts back to state before any operations performed
        await createdPlace.save({session:sess}); 
        user.places.push(createdPlace);
        await user.save({session:sess});
        sess.commitTransaction();//kinda like pushing in git. The commits are changes from the version that you started with but until you push it isnt updated so no harm no foul if something fails
    }
    catch(error){
        return(next(new HttpError('Creating place failed',500)));
    };
    

    res.status(201).json({place: createdPlace})
};

const updatePlace = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return(next(new HttpError('Invalid Inputs Passed Please try again', 422)))
    }
    const {title,description} = req.body;
    const placeId = req.params.pid;

    let place;
    try{
        place = await Place.findById(placeId);
    }
    catch(error){
        return(next(new HttpError('Could not find place in database', 500)));
    };

    place.title = title;
    place.description = description;
    if(!place){
        return(next(new HttpError('Place not in database', 404)));
    }

    try{
        await place.save();
    }
    catch(error){
        return(next(new HttpError('Could not update place in database', 500)));
    }


    res.status(200).json({place: place.toObject({getters:true})});

};
const deletePlace =async (req,res,next)=>{
    const placeId = req.params.pid;
    
    let place;
    let creator;
    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();//transactions allow you to perform multiple actions on a db where if one fails it reverts back to state before any operations performed
        place = await Place.findByIdAndRemove(placeId , {session:sess});
        creator = await User.findById(place.creator.toString());
        //console.log(creator);
        creator.places.pull(place.id.toString());
        await creator.save({session:sess});
        await sess.commitTransaction();//kinda like pushing in git. The commits are changes from the version that you started with but until you push it isnt updated so no harm no foul if something fails
    }
    catch(error){
        //console.log(place);
        //console.log(error);
        return(next(new HttpError('Could not delete in database', 500)));
    };




    res.status(200).json({message: 'Deleted place'})
};

exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.createPlace = createPlace;
exports.getPlaceById =getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;