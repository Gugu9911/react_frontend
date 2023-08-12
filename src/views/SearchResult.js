import React, { useState, useEffect } from 'react';
import searchService from '../services/search';
import { useLocation } from 'react-router-dom'; // <-- Import useLocation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Notes.module.css';
import { Link } from 'react-router-dom';


const SearchResult = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState({});
    const [likes, setLikes] = useState({});

    const location = useLocation(); // <-- Use the hook to get the current location

    let searchTerm;

    try {
        const params = new URLSearchParams(location.search); // <-- Use the location from the hook
        searchTerm = params.get('query');
        if (!searchTerm) {
            throw new Error('No search term found in the URL.');
        }
    } catch (err) {
        setError(err.message);
        setLoading(false);
    }

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const data = await searchService.search(searchTerm);
                setNotes(data);
                setError(null);
            } catch (err) {
                if (err.response) {
                    setError(`Server responded with status code ${err.response.status}: ${err.response.data.error}`);
                } else {
                    setError("An error occurred while fetching the search results.");
                }
            } finally {
                setLoading(false);
            }
        };
        if (searchTerm) {
            fetchResults();
        }
    }, [searchTerm, location.search]); // <-- Add location.search to the dependencies



      
  const handleLike = (id) => {
    setLiked(prevState => ({...prevState, [id]: !prevState[id]}));
    // If the note is already liked, decrease the number of likes, otherwise increase it
    setLikes(prevState => ({...prevState, [id]: prevState[id] ? prevState[id] - 1 : (prevState[id] || 0) + 1}));
  };



    return (
        <div className={styles.noteContainer}>
            <h2>Search Results for "{searchTerm}"</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className={styles.notesGrid}>
                {notes.map(note => (
                    <div key={note._id} className={styles.noteCard}>
                        <img src={note.imageurl[0]} alt={note.title} className={styles.noteImage} />
                        <h3 className={styles.noteTitle}>{note.title}</h3>
                        {/* Commented out for now as content was not shown in your desired structure */}
                        {/* <p className={styles.noteContent}>{note.content.substring(0, 100)}..</p> */}
                        <div className={styles.noteFooter}>
                            <p className={styles.noteAuthor}>
                                <FontAwesomeIcon icon={faUser} /> {note.author}
                            </p>
                            <div className={styles.likeButton} onClick={() => handleLike(note._id)}> 
                                <FontAwesomeIcon icon={faHeart} color={liked[note._id] ? "#EE6C4D" : "white"} />
                                <span className={styles.likeCount}>{likes[note._id] || 0}</span>
                            </div>
                        </div>
                        <Link to={`/notes/${note.id}`} className={styles.linkStyle}>View More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResult;
