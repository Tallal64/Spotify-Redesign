/* eslint-disable react/prop-types */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const CategoriesSkeleton = ({ count }) => {
  return (
    <SkeletonTheme baseColor="#fff3" highlightColor="#444">
      {[...Array(count).keys()].map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg max-h-[166px] min-h-[165px] min-w-[289px] max-w-[290px]"
        >
          {/* Skeleton for the title */}
          <div className="relative z-20 p-4">
            <Skeleton height={24} width="70%" />
          </div>
          <div className="absolute top-0 left-0 h-full w-full bg-black/35 z-10" />
        </div>
      ))}
    </SkeletonTheme>
  );
};

export default CategoriesSkeleton;
