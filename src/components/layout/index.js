import React from "react";
import Categories from "../categories";
import Details from "../details";
import Footer from "../footer";
import List from "../list";
import Navbar from "../navbar";

import "./layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      <main>
        <Navbar />
        <Categories />
        <List />
        <Details />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
