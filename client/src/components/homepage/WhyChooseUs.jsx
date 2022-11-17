import React from "react";
import diet from "../../assets/images/diet.svg";

const WhyChooseUs = () => {
  return (
    <div className="w-[90%] mx-auto p-5 min-h-[24em] my-10 flex flex-col xl:flex-row items-center justify-between shadow shadow-neutral rounded gap-10 xl:gap-0 ">
      <div
        className="flex flex-col gap-10 w-[90%] xl:w-1/2 "
        data-aos="fade-right"
      >
        <h1 className="text-4xl font-bold">Why Chose Kitchen Classico?</h1>
        <p className="text-xl font-semibold font-mono">
          Hi, Its Tanvir. These are the some reasons that helps to decide you to
          make me your chef!
        </p>
        <ul className="text-lg font-semibold list-inside list-disc">
          <li>
            Its totally homemade! Clean kitchen! Limited cooking but entirely
            tasty and healthy.
          </li>
          <li>You can customize your package by following your diet plan.</li>
          <li>Lower cost than other!</li>
          <li>
            Most of the ingredients come from own farm.So they are fresher than
            ever.
          </li>
        </ul>
      </div>
      <img
        src={diet}
        alt=""
        className="w-[90%] h-[24em] xl:w-1/2"
        data-aos="fade-right"
        data-aos-delay="300"
      />
    </div>
  );
};

export default WhyChooseUs;
