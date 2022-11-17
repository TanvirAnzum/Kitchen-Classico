import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import axios from "../utils/axios";

const AddService = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);

  const submitHandler = async (data) => {
    const { title, price, description, rating, tags, imageUrl, discount } =
      data;

    const createdAt = Date.now();

    const serviceObj = {
      title,
      price,
      description,
      rating,
      tags,
      imageUrl,
      discount,
      createdAt,
      authorName: user.displayName,
      author: user.email,
    };

    try {
      const response = await axios.post("/services", serviceObj);
      if (response.data) {
        toast.success("Service added successfully");
      }
    } catch (error) {
      toast.error("error creating service" + error.message);
    }

    reset();
  };

  return (
    <>
      <Helmet>
        <title>Add Service</title>
      </Helmet>
      <div className="w-full min-h-[90vh] flex items-center justify-center">
        <form
          className="w-[40em] min-h-[84vh] flex items-center flex-col p-5 justify-between shadow shadow-neutral rounded"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="font-bold text-2xl uppercase tracking-wider text-accent">
            Create Service
          </h1>
          <div className="flex flex-col w-[80%] gap-1">
            <label htmlFor="title" className="font-semibold text-md">
              Title of Service
            </label>
            <input
              type="text"
              placeholder="Sevice Title"
              id="title"
              className="h-[2em] border rounded px-2"
              {...register("title")}
              required
            />
          </div>
          <div className="flex flex-col w-[80%] gap-1">
            <label htmlFor="price" className="font-semibold text-md">
              Price in USD
            </label>
            <input
              type="text"
              placeholder="Price in USD"
              id="price"
              className="h-[2em] border rounded px-2"
              {...register("price")}
              required
            />
          </div>
          <div className="flex flex-col w-[80%] gap-1">
            <label htmlFor="discount" className="font-semibold text-md">
              Discount in parcentage
            </label>
            <input
              type="number"
              placeholder="Discount in parcentage"
              id="discount"
              className="h-[2em] border rounded px-2"
              {...register("discount")}
              max={100}
              min={0}
              required
            />
          </div>
          <div className="flex flex-col w-[80%] gap-1">
            <label htmlFor="rating" className="font-semibold text-md">
              Rating (from 1 to 5)
            </label>
            <input
              type="range"
              id="rating"
              min="1"
              max="5"
              className="range"
              step="1"
              {...register("rating")}
              required
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
          <div className="flex flex-col w-[80%] gap-1">
            <label htmlFor="tags" className="font-semibold text-md">
              Tags
            </label>
            <input
              type="text"
              placeholder="eg: snacks,burger,mexican-food"
              id="tags"
              className="h-[2em] border rounded px-2"
              {...register("tags")}
              required
            />
          </div>
          <div className="flex flex-col w-[80%] gap-1">
            <label htmlFor="description" className="font-semibold text-md ">
              Description
            </label>
            <textarea
              className="rounded h-[10em] px-2 py-2 textarea-bordered textarea"
              name=""
              id="description"
              cols="10"
              rows="10"
              placeholder="Service description goes here"
              {...register("description")}
              required
            />
          </div>
          <div className="flex flex-col w-[80%] gap-1">
            <label htmlFor="image" className="font-semibold text-md">
              Image Url
            </label>
            <input
              type="text"
              placeholder="Paste your image url here"
              id="image"
              className="h-[2em] border rounded px-2"
              {...register("imageUrl")}
              required
            />
          </div>
          <button type="submit" className="btn btn-accent">
            Create Service
          </button>
        </form>
      </div>
    </>
  );
};

export default AddService;
