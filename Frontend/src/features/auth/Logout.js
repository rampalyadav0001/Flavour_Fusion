import { useEffect } from 'react';
import { selectloggedInUser, signOutUserAsync } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectloggedInUser);

  useEffect(() => {
    
    dispatch(signOutUserAsync());
  },[]);

  // but useEffect runs after render, so we have to delay navigate part
  return <>{user===null && <Navigate to="/signup" replace={true}></Navigate>}</>;
// return <div className='flex items-center w-full h-full'>
//     <h1>Logged Out Sucessfully........</h1>
//     <button onClick={()=>
//         <Navigate to="/signup" replace={true}></Navigate>
//     }>Login</button>
// </div>

}

export default Logout;