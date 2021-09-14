import React from "react";
import styles from "./BlogContainer.module.scss";

const BlogContainer = ({ children }) => {
  return <div className={styles.BlogContainer}>{children}</div>;
};

export default BlogContainer;
