import Blog from "@/src/components/Blog";
import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const [data, setData] = useState([]);

  // GET ALL DATA
  useEffect(() => {
    axios("http://127.0.0.1:5000/data").then((res) => {
      setData(res.data.data);
      setLoading(false);
      setStatus();
    });
  }, [status]);

  // GET FILTERED DATA
  const handleSearch = (value) => {
    setLoading(true);
    axios(`http://127.0.0.1:5000/search?search=${value}`).then((res) => {
      setData(res.data.data);
      setLoading(false);
    });
  };

  return (
    <div>
      <div className="top-0 sticky mb-4 bg-white max-w-lg mx-auto mt-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>

        <input
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          className="w-full py-1 text-sm pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          placeholder="Search"
        />
      </div>

      {loading ? (
        <div className="text-gray-500 italic text-center my-4">Loading...</div>
      ) : (
        <div className="w-full flex justify-center my-4">
          {data.length === 0 ? (
            <div className="text-gray-500 italic">
              No data available right now!
            </div>
          ) : (
            <div className="relative">
              <div className="flex flex-col gap-4">
                {data?.map((data) => {
                  return (
                    <Blog key={data.id} data={data} setStatus={setStatus} />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
