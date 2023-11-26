import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/utils";
const SearchLogsComponent = () => {
  const [searchLogs, setSearchLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = (page) => {
    axios
      .get(`${BACKEND_URL}/searchlogs?page=${page}`)
      .then((response) => {
        setSearchLogs(response.data.data);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => console.error(error));
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  function formatDate(dateString) {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    return `${year}-${month}-${day}`;
  }
  return (
    <div>
      <h2 className="p-2">Search Logs</h2>
      <div className="flex w-full justify-between bg-[#5AB6D4] py-2">
        <div className="w-10 ">
          {" "}
          <p className="pl-2">ID</p>
        </div>
        <div className="w-75 ">
          {" "}
          <p>Text</p>
        </div>
        <div className="w-15 ">
          {" "}
          <p className="pr-2">Creation Date</p>
        </div>
      </div>
      {searchLogs.map((searchlog, index) => (
        <div
          key={searchlog.id}
          className={`flex justify-between ${
            index % 2 === 0 ? "border-b" : "border-t"
          }`}
        >
          <p className="pl-2">{searchlog.id}</p>
          <p className="pl-2">{searchlog.text}</p>
          <p className="pr-2">{formatDate(searchlog.creation_date)}</p>
        </div>
      ))}
      <div>
        {currentPage > 1 && <button onClick={handlePrevPage}>Previous</button>}
        {currentPage < totalPages && (
          <button onClick={handleNextPage}>Next</button>
        )}
      </div>
    </div>
  );
};

export default SearchLogsComponent;
