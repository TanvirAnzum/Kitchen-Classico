import React from "react";
import { PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";

const ServiceItem = ({ service }) => {
  const {
    title,
    price,
    description,
    rating,
    tags,
    imageUrl,
    discount,
    authorName,
    _id,
  } = service || {};
  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-between shadow shadow-neutral rounded p-5">
      <div className="w-full lg:w-1/3 p-3">
        <PhotoView src={imageUrl}>
          <img src={imageUrl} alt="" className="rounded" />
        </PhotoView>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-2 p-3 text-xl font-semibold min-h-[12em] justify-between ">
        <p>
          Title: <span className="text-primary">{title}</span>
        </p>
        <p>
          Rating: <span className="text-primary">{rating}</span>
        </p>
        <p>
          Tags: <span className="text-secondary font-mono">{tags}</span>
        </p>
        <p>
          Description:{" "}
          <span className="font-serif font-medium">
            {description.substring(0, 120) + "......"}
          </span>
        </p>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-2 p-3 text-xl font-semibold min-h-[12em] justify-between ">
        <p>
          Price: <span className="text-primary">{price} USD</span>
        </p>
        <p>
          Discount: <span className="text-primary">{discount}%</span>
        </p>
        <p>
          CreatedBy: <span className="text-primary">{authorName}</span>
        </p>
        <Link to={`/service/${_id}`} className="btn w-[10em]">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ServiceItem;
