import React, { useContext } from 'react';
import { useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { PopupContext } from '../context/GlobalContext';

const Header = () => {
  const { user } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const { setPopup } = useContext(PopupContext);

  const handleSearch = (event) => {
    event.preventDefault(); // Always prevent default to handle navigation yourself

    if (!searchTerm || !searchTerm.trim()) {
      navigate('/notes');
      setPopup({
        type: 'error',
        text: 'Search term is required'
      });
      setTimeout(() => setPopup(null), 2000);
      return;  // Exit early if no valid searchTerm
    }

    navigate(`/search?query=${searchTerm}`);
  }


  return (
    <header className={styles.header}>
      <div className={styles.logo}>Jingyi's Little Website</div>
      <nav className={styles.navigation}>
        <div className={styles.navLinks}>
          <Link className={styles.navLink} to='/'>Home</Link>
          <Link className={styles.navLink} to='/introduce'>Introduce</Link>
          <Link className={styles.navLink} to='/notes'>Notes</Link>
          <Link className={styles.navLink} to='/release'>Release</Link>
          {user === null ?
            <Link className={styles.navLink} to="/self">Login</Link>
            :
            <Link className={styles.navLink} to="/personinfo">{user.nickname}</Link>
          }
        </div>
        <form className={styles.searchBox} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>Search</button>
        </form>
      </nav>
    </header>
  );
};

export default Header;

