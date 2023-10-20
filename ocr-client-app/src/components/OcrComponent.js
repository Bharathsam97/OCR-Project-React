import React, { useState } from 'react';
import axios from 'axios';
import '../css/OcrComponent.css';
import DisplayImages from './DisplayImages';
import { SERVER_API_URL_UPLOAD } from  '../Constants/ConstantVals.js';

function OcrComponent() {
  const [text, setText] = useState('');
  const [imageData, setImageData] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showImageList, setShowImageList] = useState(false);
  const serverApiUrl = SERVER_API_URL_UPLOAD;


  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) {
      setError('Please select an image.');
      return;
    }

    setProcessing(true); // Set the processing state to true

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post(serverApiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setText(response.data.text);
      setImageData(response.data.originalImage);
      setError('');
    } catch (err) {
      setError('An error occurred while processing the image.');
    } finally {
      setProcessing(false); // Set the processing state back to false
    }
  };

    const handleShowImages = () => {
      setShowImageList((prevShowImageList) => !prevShowImageList);
    };
     // Reset the state to false


  return (
    <div className="ocr-container">
      <header>
        <h1>OCR Image Processing</h1>
      </header>
      <div className="image-container">
        {processing ? (
          <p>Processing...</p> // Display a processing message while waiting for results
        ) : (
          <img src={imageData} alt="Uploaded-ImageVal" className="imageVal" />
        )}
      </div>
      <div className="ocr-content">
        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImageUpload} />
        {error && <div className="error">{error}</div>}
        {text && (
          <div className="text-result">
            <h3>Extracted Text:</h3>
            <p>{text}</p>
          </div>
        )}
        <hr />
        <div className="app-container">
        <button onClick={handleShowImages}>Show Images / Close images</button>
          {showImageList && <DisplayImages />}
        </div>
      </div>
    </div>
  );
}

export default OcrComponent;
