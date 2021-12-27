import React, {useState} from "react";
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { useForm } from '../../shared/hooks/form-hook';

import './Auth.css'

const Auth = props => {
const [login, setLogin] = useState (true);

const loginSubmitHandler = () => {

};
if(login){
    return(
        <form className='auth-form' onSubmit = {loginSubmitHandler}> 
            <Input id = "userName" element = "input" type = "text" label = "Title" validators = {[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid title." onInput={()=>{}} initialValue ={formState.inputs.title.value} initialValid = {formState.inputs.title.isValid}/>
            <Input id = "passWord" element = "input" type = "password" label = "Title" validators = {[VALIDATOR_REQUIRE()]} errorText = "Please enter a valid title." onInput={()=>{}} initialValue ={formState.inputs.title.value} initialValid = {formState.inputs.title.isValid}/>
            <Button type="submit" disabled = {!formState.isValid}>Update Place</Button> 
        </form>
    );
}
return {
    
}


}

export default Auth;