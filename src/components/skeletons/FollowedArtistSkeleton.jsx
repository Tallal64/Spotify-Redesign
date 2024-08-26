/* eslint-disable react/prop-types */
import { nanoid } from "@reduxjs/toolkit";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the default styles

const FollowedArtistSkeleton = ({ count }) => {
  return (
    <SkeletonTheme baseColor="#fff3" highlightColor="#444">
      {[...Array(count).keys()].map(() => (
        <div
          key={nanoid()}
          className="flex flex-col items-center rounded-lg gap-y-4 min-w-[200px] min-h-[260px] max-w-[201px] max-h-[260px] p-2 cursor-pointer"
        >
          <div className="rounded-full overflow-hidden max-w-[170px] max-h-[170px]">
            <Skeleton circle height={170} width={170} />
          </div>
          <div className="flex flex-col items-center overflow-hidden w-full">
            <Skeleton height={20} width={150} />
            <Skeleton height={15} width={100} />
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );
};

export default FollowedArtistSkeleton;
