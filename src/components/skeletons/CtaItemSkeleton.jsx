/* eslint-disable react/prop-types */
import { nanoid } from "@reduxjs/toolkit";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const CtaItemSkeleton = ({ count }) => {
  return (
    <SkeletonTheme baseColor="#fff3" highlightColor="#444">
      {[...Array(count).keys()].map(() => (
        <div
          key={nanoid()}
          className="cursor-pointer flex p-[30px] rounded-[10px] bg-white/5 min-w-[430px] min-h-[147px] max-w-[430px] max-h-[147px]"
        >
          <div className="flex w-full gap-[30px]">
            {/* img */}
            <div>
              <div className="h-[87px] w-[87px]">
                <Skeleton circle={true} height={87} width={87} />
              </div>
            </div>
            {/* text */}
            <div className="overflow-hidden w-full flex flex-col justify-center">
              <Skeleton height={24} width="80%" />
              <Skeleton height={18} width="60%" className="mt-[2px]" />
            </div>
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );
};

export default CtaItemSkeleton;
