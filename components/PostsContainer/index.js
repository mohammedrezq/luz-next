import React from "react";
import styles from "./PostsContainer.module.scss";

const PostsContainer = ({ children }) => {
  return <div className={styles.PostsContainer}>{children}</div>;
};

export default PostsContainer;
