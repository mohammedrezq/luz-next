import React from "react";
import SkeletonComponent from "../Skeleton/Skeleton";

import styles from "./SkeletonContent.module.scss";

const SkeletonContent = () => {
  const SkeletonElements = Array(3).fill(<SkeletonComponent />);
  return (
    <div className={styles.skeletonGrid}>
      {SkeletonElements.map((item, index) => {
        return <div className={styles.skeletonItem} key={index}>{item}</div>;
      })}
    </div>
  );
};

export default SkeletonContent;
