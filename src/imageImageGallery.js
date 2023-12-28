import React from "react";
import  { useState } from 'react';
import './test.css'
const ImageGallery = ({ images }) => {
  const [showAll, setShowAll] = useState(false);

  const handleClick = () => {
    setShowAll(true);
  };

  return (
    <div className="image-gallery">
      <div className="grid">
        {showAll ? (
          images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} className="electrical-img"/>
          ))
        ) : (
          images.slice(0, 5).map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} />
          ))
        )}
      </div>
      {/* {!showAll && (
        <button onClick={handleClick} className="see-more">
        3+ Photos
        </button>
      )} */}
    </div>
  );
};

export default ImageGallery;
