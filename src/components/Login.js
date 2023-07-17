import React, { useState } from 'react';
import styles from './Login.module.css'; // Create this new CSS module for the login component
import axios from 'axios';
import { useContext } from 'react';
import { PopupContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const { setPopup } = useContext(PopupContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.username || !form.password) {
      setError("Both fields must be filled");
      return;
    }

    // Send a POST request to the backend
    axios.post('http://localhost:5001/api/login', form)
      .then(() => {
        setError(null);
        setForm({
          username: '',
          password: ''
        });
        navigate('/'); // Redirect to the home page or dashboard
        setPopup({
          type: 'success',
          text: 'Logged in successfully'
        });
        setTimeout(() => {
          setPopup(null)
        }, 3000);
      })
      .catch(err => {
        setError(err.response.data.error);
      });
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
