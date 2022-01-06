import React, {useState , useContext} from "react";

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from "../../shared/components/FormElements/imageUpload";

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext} from '../../shared/context/auth-context';
import { useHttpClient } from "../../shared/hooks/http-hook";

import './Auth.css';

const Auth = props => {
    const auth = useContext(AuthContext);
    const [isLogin, setIsLogin]= useState(true);
    
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const [formState, inputHandler , setFormData] = useForm(
        {
          email: {
            value: '',
            isValid: false
          },
          password: {
            value: '',
            isValid: false
          }
        },
        false
      );

    const switchModeHandler = event => {
        if (!isLogin){
            setFormData({
                ...formState.inputs,
                name: undefined,
                image: undefined
            },formState.inputs.email.isValid && formState.inputs.password.isValid)
        }
        else{
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image:{
                  value:null,
                  isValid:false
                }
            },false);
        }
        setIsLogin(prevMode=>!prevMode);
    };

    const authSubmitHandler = async event => {
        event.preventDefault();

        console.log(formState.inputs);
        if(isLogin)
        {
          try{
            const responseData = await sendRequest(
              'http://localhost:5000/api/users/login',
              'POST',
              JSON.stringify({
                email: formState.inputs.email.value,
                password : formState.inputs.password.value}),
                {'Content-Type': 'application/json'});
            auth.login(responseData.user.id);
          }
          catch(error){}
        }
        else
        {
          try{
            const formData = new FormData();
            formData.append('email', formState.inputs.email.value);
            formData.append('name', formState.inputs.name.value);
            formData.append('password', formState.inputs.password.value);
            formData.append('image', formState.inputs.image.value);
            console.log(formState.inputs);
            const responseData = await sendRequest(
              'http://localhost:5000/api/users/signup',
              'POST',
              formData
            );
            auth.login(responseData.user.id);
          }
          catch(error){}
        }
      }    


    return(
      <React.Fragment>
      <ErrorModal error ={error} onClear={clearError}/>
      <Card className="authentication">
          {isLoading && <LoadingSpinner asOverlay />}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
      {!isLogin && <ImageUpload id = "image" center = "center" onInput = {inputHandler} errorText = "Please provide an image." />}
      {!isLogin && (<Input element="input" id="name" type="text" label="Your Name" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a name." onInput={inputHandler} />)}
        <Input element="input" id="email" type="email" label="E-Mail" validators={[VALIDATOR_EMAIL()]} errorText="Please enter a valid email address."onInput={inputHandler}/>
        <Input element="input" id="password" type="password" label="Password" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid password." onInput={inputHandler} />
        <Button type="submit" disabled={!formState.isValid}> {isLogin ? 'LOGIN' : 'SIGNUP'} </Button>
      </form>
      <Button inverse onClick = {switchModeHandler}>{isLogin ? 'CLICK HERE TO SIGN UP' :'CLICK HERE TO LOGIN'}</Button>
    </Card>
    </React.Fragment>
  );
};

export default Auth;