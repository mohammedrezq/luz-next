import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from "./Skeleton.module.scss";

const SkeletonComponent = () => {
  return (
      <SkeletonTheme>
        <Skeleton height={300} />
        <div>
        <Skeleton height={26}  />
        </div>
        <p>
          <Skeleton height={20} count={3} />
        </p>
      </SkeletonTheme>
  );
};

export default SkeletonComponent;
