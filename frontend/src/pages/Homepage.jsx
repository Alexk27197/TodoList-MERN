import React from "react";
import Layout from "../components/Layout";
import TodoList from "../components/TodoList";
import BackgroundImg from "../assets/background.webp";

const Homepage = () => {
  return (
    <Layout title="Homepage" desc="Homepage">
      <section
        className="w-full min-h-[90vh] overflow-scroll overflow-x-hidden max-h-[400px]"
        style={{
          backgroundImage: `url(${BackgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <TodoList />
      </section>
    </Layout>
  );
};

export default Homepage;
