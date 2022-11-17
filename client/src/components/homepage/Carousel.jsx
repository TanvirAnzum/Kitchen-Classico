import React, { useState } from "react";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";

const Carousel = () => {
  const images = [img3, img2, img1];
  const [index, setIndex] = useState(0);

  const rightBtnHandler = () => {
    const tempIndex = index + 1;
    setIndex(tempIndex % 3);
  };

  const leftBtnHandler = () => {
    let tempIndex = index - 1;
    if (tempIndex < 0) tempIndex = 2;
    setIndex(tempIndex % 3);
  };

  return (
    <div className="carousel w-full">
      <div className="carousel-item relative w-full mx-auto">
        <img src={images[index]} alt="" className="w-full h-[600px]" />
        <div className="absolute z-20 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 px-5 ">
          <button
            onClick={leftBtnHandler}
            className="btn btn-accent btn-circle"
          >
            ❮
          </button>
          <button
            onClick={rightBtnHandler}
            className="btn btn-accent btn-circle"
          >
            ❯
          </button>
        </div>
        <div className="absolute flex items-center justify-center z-10 top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.5)]"></div>
        <div className="absolute z-50 left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-center flex flex-col gap-4 text-gray-50">
          <h1 className="font-bold text-xl sm:text-4xl font-serif">
            Welcome to Kitchen Classico!!
          </h1>
          <h1 className="font-bold text-2xl sm:text-6xl font-mono">
            Delicious Food & Wonderful Eating Experience
          </h1>
          <p className="font-bold text-xl font-serif">
            I do not cook! I create your emotion!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
