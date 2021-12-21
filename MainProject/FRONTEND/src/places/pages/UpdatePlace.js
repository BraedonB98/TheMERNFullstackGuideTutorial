import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators'

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

const UpdatePlace = () => {
    const placeId = useParams().placeId;

    const identifiedPlace = DUMMY_PLACES.find(p=>p.id === placeId);

    if(!identifiedPlace){
        return <div className='center'>
            <h2>Could not find place!</h2>
        </div>
    }

    return <form> 
        <Input id = "title" element = "input" type = "text" label = "Title" validators = {[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid title." onInput={() => {}} value ={identifiedPlace.title} valid = {true}/>
        <Input id = "description" element = "textarea" label = "Description" validators = {[VALIDATOR_MINLENGTH(5)]} errorText = "Please enter a valid description. Minimum of 5 characters" onInput={() => {}} value ={identifiedPlace.description} valid = {true}/>
        <Button type="submit" disabled = {true}>Update Place</Button>
    </form>;
};

export default UpdatePlace;