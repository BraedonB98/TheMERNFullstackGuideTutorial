import React from "react";
import { useParams } from 'react-router-dom';

import PlaceList from "../components/PlaceList";
import reactRouterDom from "react-router-dom";

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empires State Building',
        description:'This is an amazing 8.25 mile hike that gains 3600 ft of elevation gain, If you are looking to increase the number of CO 14ers you have summited this is one of the easiest ways to do it',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address:'Forest Road 189',
        location:{lat:39.66087 ,lng:-105.78462},
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

const UserPlaces = () =>{
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces}/>;
};

export default UserPlaces;