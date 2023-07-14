import React from 'react';
import styles from './Popup.module.css';
import { useContext } from 'react';
import { PopupContext } from '../context/GlobalContext';

const Popup = () => {
  const { popup } = useContext(PopupContext)
  if (popup === null) {
    return null
  }

  return (
    <div className={`${styles.popup} ${styles[popup.type]}`}>
      {popup.text}
    </div>
  )
};

export default Popup;
