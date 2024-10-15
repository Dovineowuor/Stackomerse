// frontend/src/components/UserProfile.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFail } from '../features/user/userSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    const loginUser = async () => {
      dispatch(loginStart());
      try {
        const userData = await fetch('/api/login').then((res) => res.json());
        dispatch(loginSuccess(userData));
      } catch (error) {
        dispatch(loginFail(error.message));
      }
    };

    loginUser();
  }, [dispatch]);

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <p>User: {userInfo?.username}</p>}
    </div>
  );
};

export default UserProfile;
