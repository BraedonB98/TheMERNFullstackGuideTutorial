import React, {useEffect, useState} from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const{isLoading,error,sendRequest,clearError} = useHttpClient();
  const [loadedUsers, setLoadedUsers]= useState([]);

  useEffect(()=>{ //Never use async on use effect call back, create new function in use effect the then call by use effect
    const fetchUsers = async () =>{ 
      try{
        const responseData = await sendRequest('http://localhost:5000/api/users');
        setLoadedUsers(responseData.users);
        //console.log(responseData);
      }
      catch(error){}
    }
    fetchUsers();
  },[sendRequest]) //when array of dependencies is empty, the useEffect will never rerun because dependencies never change
  

  return (
  <reactFragment>
    <ErrorModal error = {error} onClear = {clearError}/>
    {isLoading && 
    <div className='center'>
      <LoadingSpinner/>
      </div>}
    {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
  </reactFragment>);
};

export default Users;
