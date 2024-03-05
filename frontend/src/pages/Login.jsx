import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        login(data.userDetails);
        toast.success(data.msg);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error", error.response.data);
      alert(error.response.data.msg || "An error occurred during login");
    }
  };

  const handleGoogleLogin = () => {
    // Replace this URL with your Google OAuth login URL
    const googleLoginURL = `${process.env.REACT_APP_API_URL}/users/auth/google`;
    window.location.href = googleLoginURL;
  };

  return (
    <Layout title="Sign In Page" desc="Sign In">
      <section className="flex w-full justify-center ">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="bg-gray-300 border p-4 w-[400px] text-black rounded-md h-[400px] m-10 flex flex-col justify-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
        >
          <h1 className="text-center text-2xl text-pink-600">Sign In</h1>
          <div className="flex justify-center flex-col flex-grow gap-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-1 bg-transparent outline-none border-b-2 border-opacity-50 border-b-pink-600 "
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-1 bg-transparent outline-none border-b-2 border-opacity-50 border-b-pink-600 "
            />

            <div>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-800 hover:text-blue-700 transition-all duration-300"
              >
                Register
              </Link>
            </div>
            <div className="flex flex-col justify-center items-center">
              <button
                type="submit"
                className="w-full m-4 border-2 p-2 text-white rounded-md bg-pink-600 hover:bg-pink-500 border-pink-600 transition-all duration-300"
              >
                Submit
              </button>

              <button
                onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center gap-2 m-4 border-2 p-2 text-white rounded-md bg-red-600 hover:bg-red-500 transition-all duration-300"
              >
                <span> Sign In With Google</span>
                <FcGoogle size={24} className="bg-white w-[30px] h-[30px]" />
              </button>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default Login;
