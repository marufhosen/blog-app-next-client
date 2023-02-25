import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const [userName, setUserName] = useState();
  const [pass, setPass] = useState();
  const [error, setError] = useState();

  const router = useRouter();

  // HANDLE MOCKUP LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    if (userName === "admin" && pass === "admin") {
      router.push("/admin/post");
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div>
      <section className="max-w-xl p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize text-center">
          Admin login
        </h2>

        <form>
          <div className="">
            <div>
              <label className="text-gray-700" for="username">
                Username
              </label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                id="username"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-gray-700" for="password">
                Password
              </label>
              <input
                onChange={(e) => setPass(e.target.value)}
                id="password"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center text-sm italic mt-2">
              {error}
            </p>
          )}

          <div className="flex justify-end mt-6">
            <button
              onClick={(e) => handleLogin(e)}
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
