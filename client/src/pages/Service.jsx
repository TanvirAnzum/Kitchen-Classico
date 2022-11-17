import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import { PhotoView } from "react-photo-view";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewItem from "../components/service/ReviewItem";
import { AuthContext } from "../context/AuthContext";
import axios from "../utils/axios";

const Service = () => {
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  const { user } = useContext(AuthContext) || {};
  const location = useLocation();
  const { pathname } = location || {};
  const { id } = useParams();

  // for refetching
  const [refetch, setRefetch] = useState(false);

  // fetching service

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`services/${id}`);
      setService(response.data);
      setIsLoading(false);
    };

    fetchData().catch(console.error);
  }, [id]);

  const {
    title,
    price,
    description,
    rating,
    tags,
    imageUrl,
    discount,
    authorName,
  } = service || {};

  // review section

  // fetching reviews

  useEffect(() => {
    const fetchReview = async () => {
      const response = await axios.get(`/reviews?serviceId=${id}`);
      setReviews(response.data.apiResponse);
      setIsLoading2(false);
    };

    fetchReview().catch(console.error);
  }, [id, refetch]);

  // creating review
  const createReview = async (data) => {
    const reviewObj = {
      title: data.reviewTitle,
      description: data.reviewDescription,
      rating: data.reviewRating,
      photoUrl: user.photoURL,
      serviceId: id,
      authorName: user.displayName,
      authorEmail: user.email,
      createdAt: Date.now(),
    };

    const responsedReview = await axios.post("reviews", reviewObj);
    toast.success("New review created");

    const updatedReviews = [responsedReview.data, ...reviews];

    setReviews(updatedReviews);

    reset();
  };

  let reviewContent;

  if (isLoading2)
    reviewContent = (
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    );
  else
    reviewContent = (
      <div className="reviewbox w-full sm:w-[70%]">
        {reviews?.length === 0 && (
          <div className="w-full h-[10em] flex items-center justify-center">
            <p className="font-semibold text-2xl">
              No review yet! Be the first one!{" "}
            </p>
          </div>
        )}
        {reviews?.map((review) => (
          <ReviewItem
            key={review._id}
            review={review}
            refetch={refetch}
            setRefetch={setRefetch}
          />
        ))}
      </div>
    );

  let content;

  if (isLoading)
    content = (
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    );
  else
    content = (
      <>
        <div className="flex flex-col lg:flex-row items-center justify-between my-10 gap-10 lg:gap-0">
          <PhotoView src={imageUrl}>
            <img
              src={imageUrl}
              alt=""
              className="w-[90%] lg:w-[48%] h-[30em] rounded"
              title={title}
            />
          </PhotoView>
          <div className="flex flex-col min-h-[24em] w-[90%] lg:w-[48%] items-start justify-between gap-2">
            <h1 className="text-4xl font-bold font-serif">{title}</h1>
            <h1 className="text-md font-semibold font-mono">Tags: {tags}</h1>
            <p>
              <span className="text-xl font-semibold">Price: </span>
              <span className="text-xl font-semibold text-success">
                {price}$
              </span>
            </p>
            <p>
              <span className="text-xl font-semibold">Discount: </span>
              <span className="text-xl font-semibold text-success">
                {discount}%
              </span>
            </p>
            <p>
              <span className="text-xl font-semibold">Rating: </span>
              <span className="text-xl font-semibold text-success">
                {rating} out of 5
              </span>
            </p>
            <p className="w-[90%]">
              <span className="text-xl font-semibold">Description: </span>
              <span className="text-xl font-regular">{description}</span>
            </p>
            <p>
              <span className="text-xl font-semibold text-primary">
                Created By:{" "}
              </span>
              <span className="text-xl font-semibold text-secondary">
                {authorName}
              </span>
            </p>
          </div>
        </div>
        <hr className="w-full border-2 my-10 border-primary" />
        <div className="w-full min-h-[30vh]  display flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold font-serif">
            Consumer Reviews
          </h1>
          {reviewContent}
          <hr className="w-full border-2 my-10 border-primary" />
          {!user && (
            <h1 className="text-xl mb-10">
              Want to give review? Please{" "}
              <Link
                state={{ from: pathname }}
                className="text-xl font-semibold text-primary"
                to="/login"
              >
                login
              </Link>{" "}
              or{" "}
              <Link
                className="text-xl font-semibold text-primary"
                to="/register"
                state={{ from: pathname }}
              >
                register
              </Link>{" "}
              to your account.
            </h1>
          )}
          {user && (
            <form
              className="w-full sm:w-[70%] flex flex-col gap-5 p-5 shadow shadow-neutral rounded mb-10"
              onSubmit={handleSubmit(createReview)}
            >
              <h1 className="text-2xl font-semibold font-serif text-center">
                Add a review for <span className="text-primary">{title}</span>
              </h1>
              <div className="flex flex-col gap-2 justify-center">
                <label htmlFor="title" className="text-xl font-semibold">
                  Review Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="input input-bordered rounded-md"
                  {...register("reviewTitle")}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <label htmlFor="description" className="text-xl font-semibold">
                  Review Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  className="textarea textarea-bordered rounded-md"
                  {...register("reviewDescription")}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="rating" className="font-semibold text-xl">
                  Rating (from 1 to 5)
                </label>
                <input
                  type="range"
                  id="rating"
                  min="1"
                  max="5"
                  className="range"
                  step="1"
                  required
                  {...register("reviewRating")}
                />
                <div className="w-full flex justify-between text-xs px-2">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success w-[10em] mx-auto"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      </>
    );

  return (
    <>
      <Helmet>
        <title>Service</title>
      </Helmet>
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center p-5 gap-4">
        {content}
      </div>
    </>
  );
};

export default Service;
