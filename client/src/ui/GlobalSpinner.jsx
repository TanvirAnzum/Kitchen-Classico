import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";

const GlobalSpinner = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col gap-2 items-center justify-center">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperclassName="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
      <h1 className="text-lg font-semibold text-red-400">
        Checking Authentication...
      </h1>
    </div>
  );
};

export default GlobalSpinner;
