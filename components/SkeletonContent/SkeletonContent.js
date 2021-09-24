import React from "react";
import SkeletonComponent from "../Skeleton/Skeleton";

import styles from './SkeletonContent.module.scss'

const SkeletonContent = () => {
  const SkeletonElements = Array(3).fill(<SkeletonComponent />);
  return SkeletonElements.map((item, index) => {
    return <div key={index}>{item}</div>;
  });
};

export default SkeletonContent;