import React, { useState, useContext } from 'react';
import styles from './Login.module.css'; 
import loginService from '../services/login'; 
import { PopupContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/GlobalContext';



const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const { setPopup } = useContext(PopupContext);
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.username || !form.password) {
      setError("Both fields must be filled");
      return;
    }

    try {
      const user = await loginService.login(form);
      setError(null);
      setForm({
        username: '',
        password: ''
      });
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      );
      setUser(user);



      navigate('/personinfo'); 
      setPopup({
        type: 'success',
        text: 'Logged in successfully'
      });
      setTimeout(() => {
        setPopup(null)
      }, 2000);
    } catch(err) {
      setError(err.response.data.error);
    }
  }

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div className={styles["login-container"]}>
      <h1>Login to your account</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={form.username} placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" value={form.password} placeholder="Password" onChange={handleChange} />
        {error && <p className={styles["error-message"]}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
