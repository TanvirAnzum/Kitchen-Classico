import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../utils/axios";

const ReviewItem = ({ review, setRefetch, refetch }) => {
  const [editMode, setEditMode] = useState(false);
  const [editableText, setEditableText] = useState("");

  const {
    authorName,
    rating,
    description,
    title,
    photoUrl,
    createdAt,
    authorEmail,
    _id,
  } = review;

  const date = new Date(createdAt).toString();

  const { user } = useContext(AuthContext) || {};

  // edithandler

  const editHandler = async (e) => {
    e.preventDefault();
    await axios.patch(`reviews/${_id}`, {
      description: editableText,
    });
    toast.success("Review updated successfully");
    setEditMode(false);
  };

  const deleteHandler = async () => {
    await axios.delete(`reviews/${_id}`);
    toast.success("Review deleted successfully");
    setRefetch(!refetch);
  };

  useEffect(() => {
    if (description) setEditableText(description);
  }, [description]);

  return (
    <div className="w-full min-h-[14em] flex flex-col justify-between items-center shadow shadow-neutral my-10 p-5 rounded gap-5 md:gap-0">
      <div className="w-full flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <img src={photoUrl} alt="" className="w-[2em] h-[2em] rounded-full" />
          <h1 className="text-xl font-semibold text-secondary">{authorName}</h1>
        </div>

        <h1 className="text-xl font-semibold text-primary">{title}</h1>
        <h1 className="text-xl font-semibold text-accent">{rating} out of 5</h1>
      </div>
      <div className="w-full min-h-[5em] self-start">
        {!editMode && (
          <h1 className="text-xl font-semibold ">
            Description: {editableText}
          </h1>
        )}
        {editMode && (
          <form className="flex flex-col gap-4 my-8" onSubmit={editHandler}>
            <textarea
              className="textarea w-full textarea-bordered rounded-lg"
              value={editableText}
              onChange={(e) => setEditableText(e.target.value)}
            />
            <button type="submit" className="btn w-[8em] btn-success">
              Submit
            </button>
          </form>
        )}
      </div>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-md  font-semibold text-accent">
          Created At: <span className="text-base-content">{date}</span>
        </h1>
        <ul className="flex items-center justify-center gap-4 text-xl">
          {user?.email === authorEmail && (
            <>
              <div className="tooltip" data-tip="Toggle Edit Mode">
                <i
                  className="fa-solid fa-pen-to-square cursor-pointer text-green-500"
                  onClick={() => {
                    setEditMode(!editMode);
                  }}
                ></i>
              </div>
              <div className="tooltip" data-tip="Delete">
                <i
                  className="fa-solid fa-trash cursor-pointer text-red-500"
                  onClick={deleteHandler}
                ></i>
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ReviewItem;
