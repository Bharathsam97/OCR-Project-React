import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ImageList.css'; // Import the CSS file
// import { SERVER_API_URL_GET } from '../Constants/ConstantVals.js';

function DisplayImages() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    // const serverApiUrl = SERVER_API_URL_GET

    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_API_URL_GET);
            console.log(response); // Check the structure of response.data
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className="image-list">
            {loading && <p>Loading images...</p>}
            {images.map((image, index) => (
                <div key={index} className="image-card">
                    {image.originalImage ? (
                        <img src={image.originalImage.imageURL} alt="Uploaded-ImageVal" className="ImgVal" />
                    ) : (
                        <p>No Image Available</p>
                    )}
                    <p className="image-text">Extracted Text: {image.extractedText}</p>
                </div>
            ))}
        </div>
    );
}

export default DisplayImages;
