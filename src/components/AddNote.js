import React, { useState } from 'react';
import styles from './AddNote.module.css'; 
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import noteService from '../services/note'; 

const AddNote = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();


  const handleImagesChange = (e) => {
    if (e.target.files.length <= 5) {
      Promise.all(
        Array.from(e.target.files).map(file =>
          resizeImage(file, 400, 400) // the size you want
        )
      )
      .then(resizedImages => setImages(resizedImages))
      .catch(err => console.error(err));
    } else {
      alert("You can only upload a maximum of 5 images");
    }
  }
  
  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        const canvas = document.createElement('canvas');
        let width = image.width;
        let height = image.height;
        
        // calculate the width and height, constraining the proportions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round(height * maxWidth / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round(width * maxHeight / height);
            height = maxHeight;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);

        
        // Convert the canvas to blob and resolve the promise with it
        canvas.toBlob(resolve, file.type);
      };
      image.onerror = reject;
    });
  }

  const handleAddNote = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
      formData.append('title', title);
      formData.append('content', content);
      
      await noteService.add(formData);
      
      setTitle("");
      setContent("");
      setImages([]);

      navigate('/notes');
    } catch(err) {
      console.error(err);
    }
  }


  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };


  return (
    <div className={styles["addnote-container"]}>
      <h1>Add a note</h1>
      <form onSubmit={handleAddNote}>
        <input type="file" multiple onChange={handleImagesChange} />
        {images.length > 0 && (
          <Carousel indicators={false} controls={true}>
          {Array.from(images).map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={URL.createObjectURL(image)}
                alt="Slide"
              />
              <button onClick={() => handleRemoveImage(index)}>Remove</button>
            </Carousel.Item>
          ))}
        </Carousel>
        )}
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
