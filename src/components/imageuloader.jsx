import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { BACKEND_URL } from "@/utils";
const ImageUploader = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    // Set the selected file when a valid image file is dropped
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const fileSizeInMB = file.size / (1024 * 1024);

      // Check file size (2 MB limit) and image dimensions
      if (fileSizeInMB <= 2) {
        setSelectedFile(file);
        // Additional checks for image dimensions
        checkImageDimensions(file);
      } else {
        console.error("Invalid file size. Please select a file up to 2 MB.");
      }
    }
  };

  const checkImageDimensions = (file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      // Check image dimensions (adjust as needed for profile picture)
      if (width <= 500 && height <= 500) {
        console.log("Image dimensions are within the limits.");
      } else {
        console.error(
          "Invalid image dimensions. Please select an image up to 500x500 pixels."
        );
      }
    };
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        // Send the image file to the API endpoint
        const response = await axios.post(
          `${BACKEND_URL}/upload-profile-picture`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Upload successful!", response.data);
        props.setProfilePicture(response.data.profile_img_url);
        // Handle the response from the API endpoint as needed
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle the error as needed
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    onDrop,
    maxSize: 2 * 1024 * 1024, // Maximum file size: 2 MB
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{ padding: "20px", border: "1px dashed gray" }}
      >
        <input {...getInputProps()} />
        <p>
          Drag and drop an image file here, or click to select an image file.
        </p>
      </div>
      <button type="button" onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
    </div>
  );
};

export default ImageUploader;
