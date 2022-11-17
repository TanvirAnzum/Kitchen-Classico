import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ThreeDots } from "react-loader-spinner";
import ReviewItem from "../components/service/ReviewItem";
import { AuthContext } from "../context/AuthContext";
import axios from "../utils/axios";

const MyReviews = () => {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // for refetching
  const [refetch, setRefetch] = useState(false);

  const { user } = useContext(AuthContext) || {};

  // for pagination
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalReviews, setTotalReviews] = useState(0);

  // fetching reviews

  useEffect(() => {
    const fetchReview = async () => {
      if (!user) return;
      const response = await axios.get(
        `/reviews?email=${user?.email}&limit=${limit}&page=${page}`
      );
      if (limit < 1) return;
      setReviews(response.data.apiResponse);
      const totalCount = response.data.totalCount;
      setTotalReviews(totalCount);
      const totalPages = Math.ceil(totalCount / limit);
      setPageCount(totalPages);
      setIsLoading(false);
    };

    fetchReview().catch(console.error);
  }, [limit, page, user, user?.email, refetch]);

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
        <h1 className="text-4xl font-semibold text-primary mt-5">
          Reviews posted by {user?.displayName}
        </h1>
        <div className="w-full sm:w-[80%] flex flex-col ">
          {reviews?.map((review) => (
            <ReviewItem
              review={review}
              refetch={refetch}
              setRefetch={setRefetch}
              key={review._id}
            />
          ))}
          {!reviews?.length && (
            <div className="m-auto text-error font-semibold">
              No review posted!
            </div>
          )}
        </div>
        <div className="border border-slate-700 rounded  min-h-[2em] text-xl w-full sm:w-[80%] mx-auto flex mb-10 items-center justify-between p-2 font-bold bg-base-300">
          <p>Total reviews: {totalReviews}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <label className="font-normal text-sm">Items per page: </label>
              <input
                type="number"
                id="limitPerPage"
                className="w-[3em] rounded h-[2em] bg-inherit px-1"
                max={20}
                min={1}
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            </div>
            <div className="btn-group">
              {[...Array(pageCount)]?.map((item, index) => {
                return (
                  <button
                    className={page === index ? "btn btn-active" : "btn"}
                    key={index}
                    onClick={() => setPage(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Helmet>
        <title>My Reviews</title>
      </Helmet>
      <div className="w-[96%] mx-auto sm:w-full min-h-[70vh] flex flex-col items-center justify-between">
        {content}
      </div>
    </>
  );
};

export default MyReviews;
