import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import ServiceItem from "./ServiceItem";

const ServicesDisplay = ({ limit, skip, page, isHomepage }) => {
  const [services, setServices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`services?limit=${limit}&page=${page}`);
      setServices(response.data.apiResponse);
      setIsLoading(false);
    };

    fetchData().catch(console.error);
  }, [limit, page]);

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
        <div className="w-full min-h-[8em] bg-base-200 flex items-center justify-center">
          <h1 className="text-center text-4xl font-bold uppercase tracking-wider">
            Featured Services
          </h1>
        </div>
        <div className="mx-auto w-[90%] min-h-[70vh] flex flex-col items-center justify-center gap-10 p-5">
          {services?.map((service) => (
            <ServiceItem key={service._id} service={service} />
          ))}
        </div>

        {isHomepage && (
          <div className="btn-group my-10">
            <Link to="/services" className="btn w-[10em] btn-primary">
              View All
            </Link>
          </div>
        )}
      </>
    );

  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center justify-center">
      {content}
    </div>
  );
};

export default ServicesDisplay;
