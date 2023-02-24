import Blog from "@/src/components/Blog";
import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios("http://127.0.0.1:5000/data").then((res) => {
      setData(res.data.data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="text-gray-500 italic text-center my-4">Loading...</div>
    );
  return (
    <div className="w-full flex justify-center my-4">
      {data.length === 0 ? (
        <div className="text-gray-500 italic">No data available right now!</div>
      ) : (
        <>
          {data?.map((data) => {
            return <Blog key={data.id} data={data} />;
          })}
        </>
      )}
    </div>
  );
};

export default HomePage;
