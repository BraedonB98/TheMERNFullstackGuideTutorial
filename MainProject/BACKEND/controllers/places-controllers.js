const mongoose = require('mongoose');

const {validationResult} = require('express-validator');


const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empires State Building',
        description:'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address:'20 W 34th St',
        location:{lat:40.7484474 ,lng:-73.9871516},
        creator:'u1'
    }
    ,
    {
        id: 'p2',
        title: 'Grays and Tory Peak',
        description:'This is an amazing 8.25 mile hike that gains 3600 ft of elevation gain, If you are looking to increase the number of CO 14ers you have summit this is one of the easiest ways to do it',
        imageUrl: 'https://www.14ers.com/photos/graystorreys/routes/rt_torr5.jpg',
        address:'Forest Road 189',
        location:{lat:39.66087 ,lng:-105.78462},
        creator:'u2'
        }
]



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
    let places;
    try{
        places = await Place.find({creator:userId});
    }
    catch(error){
        return(next(new HttpError('Could not find place in database', 500)));
    };

    if(!places || places.length === 0){
        return next(new HttpError('Could not find a places for the provided user id.', 404));
    }

    res.json({places: places.map(place => place.toObject({getters:true}))}); // = res.json({place: place});
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
  
    try{
        await createdPlace.save();
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
    try{
        place = await Place.findByIdAndDelete(placeId);
    }
    catch(error){
        return(next(new HttpError('Could not delete in database', 500)));
    };




    res.status(200).json({message: 'Deleted place'})
};

exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.createPlace = createPlace;
exports.getPlaceById =getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;