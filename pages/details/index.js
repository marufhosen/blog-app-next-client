import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);

  const router = useRouter();

  console.log(router.query.id);

  useEffect(() => {
    if (router.isReady) {
      axios(`http://127.0.0.1:5000/detail?id=${router.query.id}`).then(
        (res) => {
          setDetail(res.data.data);
          console.log(res.data);
          setLoading(false);
        }
      );
    }
  }, [router]);

  if (loading)
    return (
      <div className="text-gray-500 italic text-center my-4">Loading...</div>
    );
  return (
    <div className="flex justify-center">
      <div className="mt-4">
        <Link
          className="shadow-lg px-2 bg-gray-100 text-sm hover:text-blue-500 hover:underline"
          href="/"
        >
          Back
        </Link>
        <div className="max-w-2xl overflow-hidden bg-gray-100 mt-2">
          <Image
            width={500}
            height={500}
            className="object-cover w-full h-64"
            src={detail?.url}
            alt="Article"
          />

          <div className="p-6">
            <div>
              <p className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform hover:text-gray-600">
                {detail?.title}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                {detail?.description}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                <span className="text-xs text-gray-600 ">
                  Created at {detail?.created_at?.split("T")[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
