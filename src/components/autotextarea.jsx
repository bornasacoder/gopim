import React, { useState } from "react";

function AutoExpandTextarea() {
  const [textareaValue, setTextareaValue] = useState("");

  // Function to adjust the textarea height based on its content
  const adjustTextareaHeight = () => {
    const textarea = document.getElementById("myTextarea");
    textarea.style.height = "auto"; // Reset the height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the content's scroll height
  };

  // Event handler for textarea input changes
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
    adjustTextareaHeight();
  };

  return (
    <textarea
      id="myTextarea"
      value={textareaValue}
      onChange={handleTextareaChange}
      rows={1}
      style={{ resize: "none", overflow: "hidden" }}
    />
  );
}

export default AutoExpandTextarea;
