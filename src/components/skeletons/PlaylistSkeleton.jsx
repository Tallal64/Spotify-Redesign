/* eslint-disable react/prop-types */
import { nanoid } from "@reduxjs/toolkit";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PlaylistSkeleton = ({ count }) => {
  return (
    <SkeletonTheme baseColor="#fff3" highlightColor="#444">
      {[...Array(count).keys()].map(() => (
        <div
          key={nanoid()}
          className="flex flex-col gap-y-3 bg-[#33333366] rounded-[30px]"
        >
          <li className="list-none flex cursor-pointer items-center">
            <div className="flex flex-col w-full py-2 px-5 ">
              <Skeleton width="100%" height={20} />
            </div>
          </li>
        </div>
      ))}
    </SkeletonTheme>
  );
};

export default PlaylistSkeleton;
