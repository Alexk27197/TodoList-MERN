import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <Layout>
      <section className="flex w-full justify-center ">
        <form className="bg-gray-300 border p-4 w-[400px] text-black rounded-md h-[400px] m-10 flex flex-col justify-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <h1 className="text-center text-2xl text-pink-600">Sign In</h1>
          <div className="flex justify-center flex-col flex-grow gap-2">
            <input
              type="email"
              placeholder="Email"
              className="p-1 bg-transparent outline-none border-b-2 border-opacity-50 border-b-pink-600 "
            />
            <input
              type="password"
              placeholder="Password"
              className="p-1 bg-transparent outline-none border-b-2 border-opacity-50 border-b-pink-600 "
            />

            <div>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-800 hover:text-blue-700 transition-all duration-300"
              >
                register
              </Link>
            </div>
            <button
              type="submit"
              className="m-4 border-2 p-2 text-white rounded-md bg-pink-600 hover:bg-pink-500 border-pink-600 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default Login;
