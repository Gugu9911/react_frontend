import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import likeService from '../services/like';
import { UserContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { PopupContext } from '../context/GlobalContext';

const Like = ({ noteId, initialCount, isLiked }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { setPopup } = useContext(PopupContext);
    const [liked, setLiked] = useState(isLiked);
    const [likesCount, setLikesCount] = useState(initialCount);

    const userId = user ? user.id : null;
    // Effect for fetching likes count for the note represented by noteId
    useEffect(() => {
        const fetchLikesData = async () => {
            try {
                const count = await likeService.getLikesCount(noteId);
                setLikesCount(count);
                console.log(userId, "Likes count for note:", noteId, "is", count);
    
                // Fetch the user's like status for the note
                if (user) {
                    const userLikedStatus = await likeService.hasUserLiked(noteId, user.id);
                    setLiked(userLikedStatus);
                }
            } catch (error) {
                console.error("Error fetching likes data for note:", noteId, error);
            }
        };
        fetchLikesData();
    }, [noteId, userId, user]);
    

    
    const handleLike = async () => {
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

            const response = await likeService.toggleLike(noteId, user.id);

            if (response.message === 'Like removed') {
                console.log('User has already liked this note, like is now removed.');
                setLiked(false);
            } else {
                console.log('User has not liked this note yet, like is now added.');
                setLiked(true);
            }

            // Fetch the likes count after toggling the like status.
            const newLikesCount = await likeService.getLikesCount(noteId);
            console.log('likesCount', newLikesCount);

            setLikesCount(newLikesCount);

        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };


    return (
        <div
            onClick={handleLike}
            style={{ cursor: user ? 'pointer' : 'not-allowed', opacity: user ? 1 : 0.5 }}>
            <FontAwesomeIcon icon={faHeart} color={liked ? "#EE6C4D" : "white"} />
            <span> {likesCount}</span>
        </div>
    );
};

export default Like;
