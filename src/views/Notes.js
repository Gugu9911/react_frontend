import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Notes.module.css';
import { Link } from 'react-router-dom';
import noteService from '../services/note';

import Like from '../components/Like';
// import { UserContext } from '../context/GlobalContext';
// import { useContext } from 'react';


const NotesPerPage = 6;

const Note = () => {
  const [notes, setNotes] = useState([]);

  const [page, setPage] = useState(1);
  const [liked] = useState({});

  const [totalPages, setTotalPages] = useState(1);
  // Add this state back to the Note component
  const [likesCount] = useState({});

  // Effect for fetching notes
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
  }, []); // This remains with an empty dependency array.


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
              <Like
                noteId={note.id}
                initialCount={likesCount[note.id] || 0}
                isLiked={liked[note.id]}
              />
            </div>
            {/* {user &&  */}
            <Link to={`/notes/${note.id}`} className={styles.linkStyle}>View More</Link>
            {/* } */}
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