import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
const Register = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        {
          username: userDetails.username,
          email: userDetails.email,
          password: userDetails.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Registration successful");
        login({ username: userDetails.username, email: userDetails.email });
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error", error.response.data);
      alert(error.response.data.msg || "An error occurred during registration");
    }
  };

  const handleGoogleLogin = () => {
    // Replace this URL with your Google OAuth login URL
    const googleLoginURL = `${process.env.REACT_APP_API_URL}/users/auth/google`;
    window.location.href = googleLoginURL;
  };
  return (
    <Layout title={"Sign Up Page"} desc={"Register"}>
      <section className="flex w-full justify-center ">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="bg-gray-300 border p-4 w-[400px] text-black rounded-md min-h-[400px] m-10 flex flex-col justify-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
        >
          <h1 className="text-center text-2xl text-pink-600">Sign Up</h1>
          <div className="flex justify-center flex-col flex-grow gap-2">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userDetails.username}
              onChange={handleInputChange}
              className="p-1 bg-transparent outline-none border-b-2 border-opacity-50 border-b-pink-600 "
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="p-1 bg-transparent outline-none border-b-2 border-opacity-50 border-b-pink-600 "
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={handleInputChange}
              className="p-1 bg-transparent outline-none border-b-2 border-opacity-50 border-b-pink-600 "
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={userDetails.confirmPassword}
              onChange={handleInputChange}
              className="p-1 bg-transparent outline-none border-b-2 border-opacity-50 border-b-pink-600 "
            />
            <div>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-800 hover:text-blue-700 transition-all duration-300"
              >
                login
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
                <span> Sign Up With Google</span>
                <FcGoogle size={24} className="bg-white w-[30px] h-[30px]" />
              </button>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default Register;
