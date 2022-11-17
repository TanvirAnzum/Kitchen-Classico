import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ServicesDisplay from "../components/homepage/ServicesDisplay";
import axios from "../utils/axios";

const Services = () => {
  // for paginate
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalServices, setTotalServices] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (limit <= 0) return;
      const response = await axios.get("services");
      const totalCount = response.data.totalCount;
      setTotalServices(totalCount);
      const totalPages = Math.ceil(totalCount / limit);
      setPageCount(totalPages);
    };

    fetchData().catch(console.error);
  }, [limit]);
  return (
    <>
      <Helmet>
        <title>Services</title>
      </Helmet>
      <ServicesDisplay limit={limit >= 0 ? limit : 10} page={page} />
      <div className="border border-slate-700 rounded  min-h-[2em] text-xl w-[90%] mx-auto flex mb-10 items-center justify-between p-2 font-bold bg-base-300">
        <p>Total Services: {totalServices}</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <label className="font-normal text-sm">Items per page: </label>
            <input
              type="number"
              id="limitPerPage"
              className="w-[3em] rounded h-[2em] bg-inherit px-1"
              max={20}
              min={0}
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
          <div className="btn-group">
            {[...Array(pageCount)].map((item, index) => {
              return (
                <button
                  className={page === index ? "btn btn-active" : "btn"}
                  onClick={() => setPage(index)}
                  key={index}
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
};

export default Services;
