// src/components/AboutUs.js

import React from "react";
import Layout from "../components/Layout";
import AboutUsImg from "../assets/aboutus-image.webp";
const AboutUs = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-8">About Us</h1>
        <p className="text-lg text-center mb-4">
          ToDoList is a website created to help you manage your daily tasks
          easily and efficiently.
        </p>
        <p className="text-lg text-center mb-4">
          Our team is made up of talented developers and creative designers
          working together to bring you the best tools for task management.
        </p>
        <div className="flex justify-center mt-8">
          <img
            src={AboutUsImg}
            alt="ToDoList Team"
            className="rounded-lg shadow-lg h-[280px] md:h-[600px] "
          />
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
