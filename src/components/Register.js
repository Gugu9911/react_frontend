import React, { useState } from 'react';
import styles from './Register.module.css';
import userService from '../services/user';
import { useContext } from 'react';
import { PopupContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom' 


const Register = () => {
  const [form, setForm] = useState({
    username: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    interest: ''
  });
  const { setPopup } = useContext(PopupContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.username || !form.nickname || !form.password || !form.confirmPassword || !form.interest) {
      setError("All fields must be filled");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await userService.register(form);
      setError(null);
      setForm({
        username: '',
        nickname: '',
        password: '',
        confirmPassword: '',
        interest: ''
      });
      navigate('/'); // Redirect to the home page
      setPopup({
        type: 'success',
        text: 'Registered successfully'
      });
      setTimeout(() => {
        setPopup(null)
      }, 3000);
    } catch (err) {
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
    <div className={styles["register-container"]}>
      <h1>Register and let the magic begin</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={form.username} placeholder="Username" onChange={handleChange} />
        <input type="text" name="nickname" value={form.nickname} placeholder="Nickname" onChange={handleChange} />
        <select name="interest" value={form.interest} onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="AI">Artificial Intelligence</option>
          <option value="IoT">Internet of Things</option>
          <option value="Blockchain">Blockchain</option>
          <option value="VR">Virtual Reality</option>
          <option value="AR">Augmented Reality</option>
        </select>
        <input type="password" name="password" value={form.password} placeholder="Password" onChange={handleChange} />
        <input type="password" name="confirmPassword" value={form.confirmPassword} placeholder="Confirm Password" onChange={handleChange} />

        {error && <p className={styles["error-message"]}>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
