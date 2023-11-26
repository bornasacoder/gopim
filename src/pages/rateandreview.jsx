import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/utils";

const CreateReview = ({ closePopup, projectId }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewerId, setReviewerId] = useState("");
  const [reviewOwner, setReviewOwner] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !reviewText) {
      setError("Missing required fields");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/reviews`,

        {
          rating,
          review: reviewText,
          project_id: projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage(response.data.message);
      setRating(0);
      setReviewText("");

      setError("");
    } catch (error) {
      setError("An error occurred while creating the review");
    }
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const starClassName = i <= rating ? "starstar filled" : "star";

      stars.push(
        <svg
          key={i}
          className={`${starClassName} w-6 h-6 `}
          onClick={() => handleRatingClick(i)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="mt-12 flex justify-center flex-col items-center">
      <h1>Rate and review </h1>
      {error && <p className="text-secondary"> {error}</p>}
      {message && <p className="text-primary">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full items-center p-4"
      >
        <div className="flex flex-col w-full my-2">
          <label>Select start rating:</label>
          <div className="flex cursor-pointer my-2">{renderStars()}</div>
        </div>
        <div className="flex flex-col w-full">
          <label>Comments:</label>
          <textarea
            value={reviewText}
            placeholder="comments"
            className="border-2 border-dashed border-grey-100 w-full"
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>

        <div className="flex justify-around mt-4 w-full">
          <button
            type="submit"
            className="bg-primary text-white rounded-md pr-4"
          >
            Create Review
          </button>
          <button
            type="button"
            className="bg-secondary text-white rounded-md pl-4"
            onClick={() => {
              closePopup();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReview;
