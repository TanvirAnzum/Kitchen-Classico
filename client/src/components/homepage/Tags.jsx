import React from "react";

import baker from "../../assets/images/baker.svg";
import heavy from "../../assets/images/heavy.svg";
import snacks from "../../assets/images/snacks.svg";

const Tags = () => {
  return (
    <div className="w-full min-h-[30em] flex items-center justify-center p-5 bg-base-100">
      <div className="flex flex-col lg:flex-row items-center justify-between w-[80%]">
        <div
          className="w-[20em] h-[20em] flex flex-col items-center justify-around"
          data-aos="fade-left"
        >
          <img
            className="w-[8em] h-[8em] border bg-sky-200 rounded-full"
            src={heavy}
            alt=""
          />
          <h1 className="font-semibold text-xl">Three-course Meal</h1>
          <p className="text-lg text-center">
            Kitchen classico provides meal for every course. Healthy, tasty and
            energetic breakfast packags, heavy and light dinner and lunch
            packages are available.
          </p>
        </div>

        <div
          className="w-[20em] h-[20em]  flex flex-col items-center justify-around"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <img
            className="w-[8em] h-[8em] border bg-sky-200 rounded-full border-sky-300"
            src={snacks}
            alt=""
          />
          <h1 className="font-semibold text-xl">Snacks</h1>
          <p className="text-lg text-center">
            Kitchen classico provides variety of snacks items. Different types
            of set menus, combos and packages are available. For more than 50$
            snacks order gets free home delivery.
          </p>
        </div>

        <div
          className="w-[20em] h-[20em] flex flex-col items-center justify-around"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <img
            className="w-[8em] h-[8em] border bg-sky-200 rounded-full border-sky-300"
            src={baker}
            alt=""
          />
          <h1 className="font-semibold text-xl">Baker</h1>
          <p className="text-lg text-center">
            Kitchen classico provides stylish and tasty cakes for birthdays. You
            can order your daily bread and toast for breakfast.Prices are cheap
            and offers are available for various items.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tags;
