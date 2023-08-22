import React, { useEffect, useState, useContext } from 'react';
import styles from './PersonInfo.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import noteService from '../services/note';
import { UserContext } from '../context/GlobalContext';
import Like from '../components/Like';

const NotesPerPage = 4;

const PersonInfo = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [liked] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [likesCount] = useState({});


  const logout = () => {
    window.localStorage.removeItem('loggedAppUser');
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const allNotes = await noteService.getAll();
        const userNotes = allNotes.filter(note => note.author === user.nickname);
        setNotes(userNotes);
        setTotalPages(Math.ceil(userNotes.length / NotesPerPage));
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchNotes();
    }
  }, [user]);



  if (!user) {
    return null;  // Or return a loading screen here until user is loaded.
  }

  const paginatedNotes = notes.slice((page - 1) * NotesPerPage, page * NotesPerPage);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.personinfoContainer}>
        <h1>Welcome, {user.nickname}!</h1>
        <p>Username: {user.username}</p>
        <p>Interest: {user.interest}</p>
        <button onClick={logout}>Logout</button>
      </div>
      <div className={styles.noteContainer}>
        <h2>Your Notes</h2>
        <div className={styles.notesGrid}>
          {paginatedNotes.map((note, index) => (
            <div key={index} className={styles.noteCard}>
              <img src={note.imageurl[0]} alt={note.title} className={styles.noteImage} />
              <h3 className={styles.noteTitle}>{note.title}</h3>
              <div className={styles.noteFooter}>
                <p className={styles.noteAuthor}>
                  <FontAwesomeIcon icon={faUser} /> {note.author}
                </p>
                <Like
                noteId={note.id}
                initialCount={likesCount[note.id] || 0}
                isLiked={liked[note.id]}
              />
              </div>
              <Link to={`/notes/${note.id}`} className={styles.linkStyle}>View More</Link>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={page === index + 1 ? styles.paginationActive : styles.paginationButton}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
};

  export default PersonInfo;