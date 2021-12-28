const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');

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
        title: 'Grays and Torries Peak',
        description:'This is an amazing 8.25 mile hike that gains 3600 ft of elevation gain, If you are looking to increase the number of CO 14ers you have summited this is one of the easiest ways to do it',
        imageUrl: 'https://www.14ers.com/photos/graystorreys/routes/rt_torr5.jpg',
        address:'Forest Road 189',
        location:{lat:39.66087 ,lng:-105.78462},
        creator:'u2'
        }
]



const getPlaceById = (req,res,next)=>{
    const placeId = req.params.pid; // because pid was used in the get /:pid this is the {pid: 'p1'}
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    if(!place){
        return next(new HttpError('Could not find a place for the provided id.', 404));
    }

    res.json({place}); // = res.json({place: place});
}

const getPlacesByUserId = (req,res,next)=>{
    const userId = req.params.uid; // because uid was used in the get /:uid this is the {uid: 'p1'}
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    });
    if(!places || places.length === 0){
        return next(new HttpError('Could not find a places for the provided user id.', 404));
    }

    res.json({places}); // = res.json({place: place});
}

const createPlace = (req, res, next) => {
    const {title,description,coordinates,address,creator} = req.body;

    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace); 

    res.status(201).json({place: createdPlace})
};

const updatePlace = (req,res,next)=>{
    const {title,description} = req.body;
    const placeId = req.params.pid;

    const updatedPlace = {...DUMMY_PLACES.find(p => p.id ===placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id ===placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;
    DUMMY_PLACES[placeIndex]= updatedPlace;

    res.status(200).json({place: updatedPlace})

};
const deletePlace = (req,res,next)=>{
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id!==placeId);
    res.status(200).json({message: 'Deleted place'})
};

exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.createPlace = createPlace;
exports.getPlaceById =getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;