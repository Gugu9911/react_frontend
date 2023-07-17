import React from 'react';
import { useState } from 'react';
import styles from './Self.module.css';
import Register from '../components/Register';
import Login from '../components/Login';

const Self = () => {
  const [isRegister, setIsRegister] = useState(true);

  return(
    <div>
      {isRegister ? <Register /> : <Login />}
      <p className={styles.switchText}>
        {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}
        <button onClick={() => setIsRegister(!isRegister)} className={styles.switchLink}>
          {isRegister ? ' Login' : ' Register'}
        </button>
      </p>

    </div>
  )
}

export default Self;