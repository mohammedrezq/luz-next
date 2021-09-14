import React from "react";
import { NextSeo } from "next-seo";

import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";

import styles from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <>
      <NextSeo
        title="Simple Usage Example"
        description="A short description goes here."
      />
      <div className={styles.layout}>
        <Header />
        <Main>{props.children}</Main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;