import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom'

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>Janine's Little Website</div>
    <nav className={styles.navigation}>
      <Link className={styles.navLink} to='/'>Home</Link>
      <Link className={styles.navLink} to='/introduce'>Introduce</Link>
      <Link className={styles.navLink} to='/self'>Self</Link>
      <div className={styles.searchBox}>
        <input type="text" placeholder="Search" className={styles.searchInput} />
        <button className={styles.searchButton}>Search</button>
      </div>
    </nav>
  </header>
);

export default Header;
