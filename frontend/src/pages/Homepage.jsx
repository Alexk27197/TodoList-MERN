import React from "react";
import Layout from "../components/Layout";
import DisplayTasks from "../components/DisplayTasks";
import TodoList from "../components/TodoList";

const Homepage = () => {
  return (
    <Layout title="Homepage" desc="Homepage">
      <section>
        <TodoList />
      </section>
    </Layout>
  );
};

export default Homepage;
