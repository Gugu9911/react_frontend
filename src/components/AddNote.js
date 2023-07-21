import React, { useState, useEffect } from 'react';
import styles from './AddNote.module.css'; 
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import noteService from '../services/note'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const MAX_IMAGES = 5;

const AddNote = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.url));
    }
  }, [images]);

  const handleImagesChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if ((files.length + images.length) > MAX_IMAGES) {
        alert(`You can only add up to ${MAX_IMAGES} images. You are trying to add ${files.length} more.`);
        return;
      }
      files.forEach(file => {
        resizeImage(file, 800, 800).then(resizedImage => {
          setImages(prevImages => [...prevImages, { url: URL.createObjectURL(resizedImage), blob: resizedImage }]);
        });
      });
    }
  }

  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      let img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        let canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const MAX_WIDTH = maxWidth;
        const MAX_HEIGHT = maxHeight;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, file.type);
      };
    });
  }

  const handleAddNote = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i].blob);
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
      alert('Failed to add note');
    }
  }

  const handleRemoveImage = (index) => {
    setImages(images.filter((img, i) => i !== index));
  }

  return (
    <div className={styles["addnote-container"]}>
      <h1>Add a note</h1>
      <form onSubmit={handleAddNote}>
        <input type="file" multiple onChange={handleImagesChange} />
        {images.length > 0 && (
          <Carousel indicators={false} controls={true}>
            {images.map((image, index) => (
              <Carousel.Item key={image.url}>
                <img
                  className="d-block w-100"
                  src={image.url}
                  alt={`Slide ${index}`}
                />
                <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <ReactQuill value={content} onChange={setContent} />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
