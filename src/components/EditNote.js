import React, { useState, useEffect } from 'react';
import styles from './AddNote.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import noteService from '../services/note';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const MAX_IMAGES = 5;

const EditNote = () => {
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchNote = async () => {
            try {
                const fetchedNote = await noteService.getOne(id);
                setTitle(fetchedNote.title);
                setContent(fetchedNote.content);
                setImages(fetchedNote.imageurl.map(image => ({ url: image })));
            } catch (error) {
                console.error(error);
            }
        };
        fetchNote();
    }, [id]);


    const resizeImage = (file, maxDim) => {
        return new Promise((resolve) => {
            let img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                let canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const MAX_DIM = maxDim;
                let width = img.width;
                let height = img.height;
                if (width > height) {
                    height *= MAX_DIM / width;
                    width = MAX_DIM;
                } else {
                    width *= MAX_DIM / height;
                    height = MAX_DIM;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(resolve, file.type);
            };
        });
    }

    const handleImagesChange = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            if ((files.length + images.length) > MAX_IMAGES) {
                alert(`You can only add up to ${MAX_IMAGES} images. You are trying to add ${files.length} more.`);
                return;
            }
            files.forEach(file => {
                resizeImage(file, 800, 800).then(resizedImage => {
                    setImages(prevImages => [...prevImages, { url: URL.createObjectURL(resizedImage), blob: resizedImage, name: file.name }]);
                });
            });
        }
    }

    const handleUpdateNote = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        // for (let i = 0; i < images.length; i++) {
        //     if (images[i].blob) { // This image is a new image
        //         formData.append('images', new File([images[i].blob], images[i].name, { type: 'image/jpeg' }));
        //     } else { // This image is an existing image
        //         formData.append('images', images[i].url);
        //     }
        // }

        for (let i = 0; i < images.length; i++) {
            if (images[i].delete) {
                formData.append('deleteImageURLs', images[i].url); // Marked for deletion
            } else if (images[i].blob) {
                formData.append('images', new File([images[i].blob], images[i].name, { type: 'image/jpeg' }));
            } else {
                formData.append('existingImages', images[i].url); // This image is an existing image
            }
        }


        formData.append('title', title);
        formData.append('content', content);
        try {
            await noteService.update(id, formData);
            setTitle("");
            setContent("");
            setImages([]);
            navigate('/notes');
            alert('Note updated successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to update note');
        }
    }

    // const handleRemoveImage = (index) => {
    //     setImages(images.filter((img, i) => i !== index));
    // }

    // const handleRemoveImage = (index) => {
    //     setImages(prevImages => {
    //         const newImages = [...prevImages];
    //         if (!newImages[index].blob) { // If it's an existing image
    //             newImages[index].delete = true; // Mark for deletion
    //         } else {
    //             newImages.splice(index, 1); // Remove new blobs directly since they aren't on server yet
    //         }
    //         return newImages;
    //     });
    // };
    const handleRemoveImage = (url) => {
        setImages(prevImages => {
            const newImages = [...prevImages];
            const imageIndex = newImages.findIndex(img => img.url === url);
            if (imageIndex === -1) return prevImages; // Return the previous state if image not found

            if (!newImages[imageIndex].blob) {
                newImages[imageIndex].delete = true;
            } else {
                newImages.splice(imageIndex, 1);
            }

            return newImages;
        });
    };




    return (
        <div className={styles.addnoteContainer}>
            <h2>Edit a Note</h2>
            <form onSubmit={handleUpdateNote}>
                <input type="file" multiple onChange={handleImagesChange} />
                {images.length > 0 && (
                    <Carousel indicators={false} controls={true} interval={null}>
                        {images.filter(img => !img.delete).map((image, index) => (
                            <Carousel.Item key={image.url} className={styles.carouselItem}>
                                <div className={styles.carouselImageContainer}>
                                    <img
                                        className={styles.carouselImage}
                                        src={image.url}
                                        alt={`Slide ${index}`}
                                    />
                                    {/* <button
                                        className={styles.carouselRemoveButton}
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        Remove this picture
                                    </button> */}
                                    <button
                                        className={styles.carouselRemoveButton}
                                        type="button"
                                        onClick={() => handleRemoveImage(image.url)}
                                    >
                                        Remove this picture
                                    </button>

                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )}
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Edit the title" />
                <ReactQuill
                    className={styles.quillEditor}
                    theme='snow'
                    value={content}
                    onChange={setContent}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditNote;
