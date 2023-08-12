import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Notes.module.css';
import { Link } from 'react-router-dom';
import noteService from '../services/note';
import { UserContext } from '../context/GlobalContext';
import likeService from '../services/like';
import { useNavigate } from 'react-router-dom';
import { PopupContext } from '../context/GlobalContext';


const NotesPerPage = 6;

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [liked, setLiked] = useState({});
  const [page, setPage] = useState(1);
  const [likes, setLikes] = useState({});
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const { setPopup } = useContext(PopupContext);
  

  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const allNotes = await noteService.getAll();
        setNotes(allNotes);
        setTotalPages(Math.ceil(allNotes.length / NotesPerPage));
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);


  // const handleLike = (id) => {
  //   setLiked(prevState => ({...prevState, [id]: !prevState[id]}));

  //   // If the note is already liked, decrease the number of likes, otherwise increase it
  //   setLikes(prevState => ({...prevState, [id]: prevState[id] ? prevState[id] - 1 : (prevState[id] || 0) + 1}));
  // };
  const handleLike = async (id) => {
    if (!user) {
      navigate('/register');
      setPopup({
        type: 'error',
        text: 'You must be logged in to like a note'
      });
      setTimeout(() => {
        setPopup(null)
      }, 2000);
      return;
    }
    try {
      console.log('Like button clicked');
      const updatedNote = await likeService.toggleLike(id);

      setLiked(prevState => ({
        ...prevState,
        [id]: updatedNote.liked
      }));
      console.log(updatedNote.liked);

      setLikes(prevState => ({
        ...prevState,
        [id]: updatedNote.likesCount || 0
      }));
      console.log(updatedNote.likesCount);

    } catch (error) {
      console.error("Error toggling like:", error);
    }
};



  const paginatedNotes = notes.slice((page - 1) * NotesPerPage, page * NotesPerPage);

  return (
    <div className={styles.noteContainer}>
      <h2>Notes</h2>
      <div className={styles.notesGrid}>
        {paginatedNotes.map((note, index) => (
          <div key={index} className={styles.noteCard}>
            <img src={note.imageurl[0]} alt={note.title} className={styles.noteImage} />
            <h3 className={styles.noteTitle}>{note.title}</h3>
            {/* <p className={styles.noteContent}>{note.content.substring(0, 100)}..</p>   */}
            <div className={styles.noteFooter}>
              <p className={styles.noteAuthor}>
                <FontAwesomeIcon icon={faUser} />   {note.author}
              </p>
              <div className={styles.likeButton}
                onClick={() => handleLike(note.id)}
                style={{ cursor: user ? 'pointer' : 'not-allowed', opacity: user ? 1 : 0.5 }}>
                <FontAwesomeIcon icon={faHeart} color={liked[note.id] ? "#EE6C4D" : "white"} />
                <span className={styles.likeCount}>{likes[note.id] || 0}</span>
              </div>
            </div>
            {user && <Link to={`/notes/${note.id}`} className={styles.linkStyle}>View More</Link>}
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {Array(totalPages).fill(null).map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? styles.paginationActive : undefined}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Note;