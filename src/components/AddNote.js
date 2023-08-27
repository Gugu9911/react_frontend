import React, { useState, useEffect } from 'react';
import styles from './AddNote.module.css';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import noteService from '../services/note';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { PopupContext } from '../context/GlobalContext';
import { UserContext } from '../context/GlobalContext';

const MAX_IMAGES = 8;

const AddNote = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(UserContext)
  const { setPopup } = useContext(PopupContext)



  if (!user) {
    setPopup({
      type: 'info',
      text: 'You need to login to post a blog'
    })
    setTimeout(() => {
      setPopup(null)
    }, 2000)
    navigate('/register')
  }

  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.url));
    }
  }, [images]);

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

  const handleAddNote = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', new File([images[i].blob], images[i].name, { type: 'image/jpeg' }));
    }
    formData.append('title', title);
    formData.append('content', content);


    try {
      await noteService.create(formData);
      setTitle("");
      setContent("");
      setImages([]);
      navigate('/notes');
      alert('Note added successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to add note: Your image size is too big, Please try again and wait patiently.');
    } 
  }



  const handleRemoveImage = (index) => {
    setImages(images.filter((img, i) => i !== index));
  }

    return (
      <div className={styles.addnoteContainer}>
        <h2>Create a Note</h2>
        <form onSubmit={handleAddNote}>
          <input type="file" multiple onChange={handleImagesChange} />
          {images.length > 0 && (
            <Carousel indicators={false} controls={true} interval={null}>
              {images.map((image, index) => (
                <Carousel.Item key={image.url} className={styles.carouselItem}>
                  <div className={styles.carouselImageContainer}>
                    <img
                      className={styles.carouselImage}
                      src={image.url}
                      alt={`Slide ${index}`}
                    />
                    <button 
                      className={styles.carouselRemoveButton} 
                      type="button" 
                      onClick={() => handleRemoveImage(index)}
                    >
                      Remove this picture
                    </button>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>        
          )}
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Add a title" />
          <ReactQuill
            className={styles.quillEditor}
            theme='snow'
            value={content}
            onChange={setContent}
          />
          <button type="submit">Post</button>
        </form>
      </div>
    );  
  };


export default AddNote;
