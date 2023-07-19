import React, { useContext } from 'react';
import styles from './PersonInfo.module.css';
import { UserContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const PersonInfo = () => {
  const { user,setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem('loggedAppUser');
    setUser(null);
    navigate("/");
};


  return (
    <div className={styles["personinfo-container"]}>
          <h1>Welcome, {user.nickname}!</h1>
          <p>Username: {user.username}</p>
          <p>Interest: {user.interest}</p>
          <button onClick={logout}>Logout</button>
    </div>
  );
};

export default PersonInfo;

