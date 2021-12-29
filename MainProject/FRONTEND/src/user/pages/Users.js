import React, {useEffect, useState} from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]= useState();
  const [loadedUsers, setLoadedUsers]= useState([]);

  useEffect(()=>{ //Never use async on use effect call back, create new function in use effect the then call by use effect
    const sendRequest = async () =>{ 
      try{
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/users');
      
        const responseData = await response.json();

        if(!response.ok){//checks if error code is 4** or 5** error
          throw new Error(responseData.message);
        }

        setLoadedUsers(responseData.users);
      }
      catch(error)
      {
        setError(error.message);
      }
      setIsLoading(false);
    }
    sendRequest();
  },[]) //when array of dependencies is empty, the useEffect will never rerun because dependencies never change
  
  const errorHandler = () =>{
    setError(null);
  }
  return (
  <reactFragment>
    <ErrorModal error = {error} onClear = {errorHandler}/>
    {isLoading && 
    <div className='center'>
      <LoadingSpinner/>
      </div>}
    {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
  </reactFragment>);
};

export default Users;
