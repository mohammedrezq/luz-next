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
        title={props.title}
        description={props.description}
      />
      <div className={styles.layout}>
        <Header menus={props.menus} />
        <Main>{props.children}</Main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
