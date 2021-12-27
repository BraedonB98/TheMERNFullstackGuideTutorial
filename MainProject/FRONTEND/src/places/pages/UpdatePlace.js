import React, {useEffect , useState} from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from  '../../shared/components/UIElements/Card';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empires State Building',
        description:'This is an amazing 8.25 mile hike that gains 3600 ft of elevation gain, If you are looking to increase the number of CO 14ers you have summit this is one of the easiest ways to do it',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address:'Forest Road 189',
        location:{lat:39.66087 ,lng:-105.78462},
        creator:'u1'
    }
    ,
    {
        id: 'p2',
        title: 'Grays and Torrys Peak',
        description:'This is an amazing 8.25 mile hike that gains 3600 ft of elevation gain, If you are looking to increase the number of CO 14ers you have summit this is one of the easiest ways to do it',
        imageUrl: 'https://www.14ers.com/photos/graystorreys/routes/rt_torr5.jpg',
        address:'Forest Road 189',
        location:{lat:39.66087 ,lng:-105.78462},
        creator:'u2'
        }
]

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;   

    const [formState, inputHandler , setFormData] = useForm({
        title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
    } , false)

    const identifiedPlace = DUMMY_PLACES.find(p=>p.id === placeId); 
    useEffect(()=>{
        if(identifiedPlace){
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                  },
                  description: {
                    value: identifiedPlace.description,
                    isValid: true
                  },
            },true);
        }
        setIsLoading(false);
    },[setFormData, identifiedPlace]);
    

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if(!identifiedPlace){
        return <div className='center'>
            <Card>
            <h2>Could not find place!</h2>
            </Card>
        </div>
    }

    if (isLoading ){
        return(<div className='center'>
        <h2>Loading...</h2>
        </div>);
    }
    return (
    <form className='place-form' onSubmit = {placeUpdateSubmitHandler}> 
        <Input id = "title" element = "input" type = "text" label = "Title" validators = {[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid title." onInput={inputHandler} initialValue ={formState.inputs.title.value} initialValid = {formState.inputs.title.isValid}/>
        <Input id = "description" element = "textarea" label = "Description" validators = {[VALIDATOR_MINLENGTH(5)]} errorText = "Please enter a valid description. Minimum of 5 characters" onInput={inputHandler} initialValue ={formState.inputs.description.value} initialValid = {formState.inputs.title.isValid}/>
        <Button type="submit" disabled = {!formState.isValid}>Update Place</Button> 
    </form>);
};

export default UpdatePlace;