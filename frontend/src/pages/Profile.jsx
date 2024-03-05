import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/update-profile/${user?.userId}`,
        { username, email },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success("Profile updated successfully.");
        setUser({ userId: user?.userId, email, username });
      }
    } catch (error) {
      console.log("Failed to update profile. ", error);
    }
  };

  return (
    <Layout title="Profile Page">
      <div className="container mx-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username || user.username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email || user.email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update Profile
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
