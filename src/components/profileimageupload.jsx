import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

const CloudinaryUploader = (props) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [tooltipStatus, setTooltipStatus] = useState(false);
  const handleUploadSuccess = (result) => {
    console.log("result: ", result);
    const { secure_url } = result.info;
    setUploadedImageUrl(secure_url);
    props.setFormData((prevState) => ({
      ...prevState,
      profile_img_url: secure_url,
    }));
  };

  const handleOnClick = (e, open) => {
    e.preventDefault();
    open();
  };

  return (
    <div className="absolute flext justify-center">
      <CldUploadWidget uploadPreset="i8ddzech" onUpload={handleUploadSuccess}>
        {({ open }) => (
          <button
            className="button upload-icon text-white font-bold py-2 px-4 rounded-3xl"
            onClick={(e) => handleOnClick(e, open)}
            onMouseEnter={() => {
              setTooltipStatus(true);
            }}
            onMouseLeave={() => {
              setTooltipStatus(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <>{tooltipStatus && <span>Add photo</span>}</>
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default CloudinaryUploader;
