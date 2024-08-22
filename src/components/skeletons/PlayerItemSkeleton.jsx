/* eslint-disable react/prop-types */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PlayerItemSkeleton = ({ count }) => {
  return (
    <SkeletonTheme
      baseColor="#fff3"
      highlightColor="#444"
      className="flex flex-col gap-3"
    >
      {[...Array(count).keys()].map((_, index) => (
        <div key={index} className="flex items-center gap-x-3">
          <Skeleton
            circle={true}
            height={50}
            width={50}
            containerClassName="avatar-skeleton"
          />
          <div className="flex-1">
            <Skeleton height={20} width="80%" />
            <Skeleton height={15} width="50%" />
          </div>
          <div className="flex gap-x-5">
            <Skeleton height={20} width={100} />
            <Skeleton height={20} width={100} />
            <Skeleton height={20} width={100} />
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );
};

export default PlayerItemSkeleton;
