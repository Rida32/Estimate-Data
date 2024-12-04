import React, { useState } from "react";

const MultipleImageUpload = ({images=[], setImages=()=>{}, sowButton=true}) => {
 

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...imagePreviews]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {sowButton? 
      <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
        <div
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#ccc",
            borderRadius: "5px",
            textAlign: "center",
            color: "#000",
          }}
        >
          <i className="fa fa-cloud-upload" style={{ marginRight: "5px" }} />
          Upload File
        </div>
      </label>:<></>}
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              margin: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <img
              src={image.preview}
              alt="Uploaded"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <button
              onClick={() => handleRemoveImage(index)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "red",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                width: "20px",
                height: "20px",
              }}
            >
              D
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleImageUpload;
