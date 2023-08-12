import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import noteService from '../services/note';
import styles from './ShowNote.module.css';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/GlobalContext';
import { PopupContext } from '../context/GlobalContext';
// import "react-responsive-carousel/lib/styles/carousel.min.css";


const ShowNote = () => {
    const [note, setNote] = useState(null);
    const { id } = useParams();
    const { user } = useContext(UserContext)
    const { setPopup } = useContext(PopupContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const fetchedNote = await noteService.getOne(id);
                setNote(fetchedNote);
                console.log(fetchedNote);
            } catch (error) {
                console.error(error);
            }
        };
        fetchNote();
    }, [id]);

    if (!note) {
        return null;
    }

    const handleEdit = () => {
        navigate(`/editnote/${note.id}`)
      }
    
    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${note.title}?`)) {
            try {
                await noteService.setToken(user.token);
                await noteService.deleteNote(note);
                navigate('/notes');
                setPopup({
                    type: 'success',
                    text: 'Note deleted successfully'
                });
                setTimeout(() => {
                    setPopup(null)
                }, 2000);
            } catch (error) {
                console.error(error);
            }
        }
    };



    return (
        <div className={styles.noteContainer}>
            <Carousel dynamicHeight={true} emulateTouch={true}>
                {note.imageurl.map((url, index) => (
                    <div key={index} className={styles.carouselItem}>
                        <img src={url} alt={`carousel-item-${index}`} />
                    </div>
                ))}
            </Carousel>
            <h2 className={styles.noteTitle}>{note.title}</h2>
            <p className={styles.noteContent} dangerouslySetInnerHTML={{ __html: note.content }}></p>
            <p className={styles.noteAuthor}>Author: {note.author}</p>
            <p className={styles.updatedAt}>Last updated: {new Date(note.updatedAt).toLocaleString()}</p>

            {user && user.nickname === note.author &&
                <div className={styles.buttonContainer}>
                    <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
                    <button onClick={handleEdit} className={styles.editButton}>Edit</button>
                </div>
            }
        </div>
    );
};

export default ShowNote;
