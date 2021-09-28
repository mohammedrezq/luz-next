import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";

import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";

import styles from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={props.description} />
        <title>{props.title}</title>
        <meta content="#fff" name="theme-color"/>
        <link href={props.url} rel="canonical" />
        <meta content={props.title} itemProp="name" />
        <meta content={props.description} itemProp="description" />
        <meta content={props.type} property="og:type" />
        <meta content={props.url} property="og:url" />
        <meta content={props.sitename} property="og:site_name" />
        <meta content={props.title} property="og:title" />
        <meta content={props.description} property="og:description" />
      </Head>

      <div className={styles.layout}>
        <Header menus={props.menus} />
        <Main>{props.children}</Main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
