import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
const Layout = ({ children, title, desc }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Helmet>
      <div className="flex flex-col ">
        <Header />
        <main className="flex-grow min-h-[85vh]">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
