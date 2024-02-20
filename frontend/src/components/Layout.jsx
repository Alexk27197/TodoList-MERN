import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
const Layout = ({ children, title, desc }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Helmet>
      <div className="flex flex-col ">
        <Header />
        <main className="w-full h-[80vh] flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
