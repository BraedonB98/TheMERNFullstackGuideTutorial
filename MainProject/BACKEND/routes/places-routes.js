const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
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

router.get('/:pid',(req,res,next)=>{
    const placeId = req.params.pid; // because pid was used in the get /:pid this is the {pid: 'p1'}
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    if(!place){
        const error = new Error('Could not find a place for the provided id.')
        error.code = 404;
        return next(error);
    }

    res.json({place}); // = res.json({place: place});
});

router.get('/user/:uid',(req,res,next)=>{
    const userId = req.params.uid; // because uid was used in the get /:uid this is the {uid: 'p1'}
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });
    if(!place){
        const error = new Error('Could not find a place for the provided user id.')
        error.code = 404;
        return next(error);
    }

    res.json({place}); // = res.json({place: place});
});

module.exports = router;
