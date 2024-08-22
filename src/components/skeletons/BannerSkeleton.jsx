/* eslint-disable react/prop-types */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const BannerSkeleton = ({className}) => {
  return (
    <SkeletonTheme baseColor="#fff3" highlightColor="#444">
      <div
        className={`px-8 w-full p-7 mb-5 bg-gradient-to-b from-[#2cd76b5b] to-[#03150b] ${className}`}
      >
        {/* upper div */}
        <div className="flex items-end gap-x-6">
          {/* div for decoration */}
          <div className="h-72 w-72 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#2cd76bb8] via-[#2cd76b9f] to-[#03150b]">
            <Skeleton circle={true} height={180} width={180} />
          </div>

          {/* no decoration */}
          <div className="flex flex-col gap-y-2">
            <Skeleton
              className="capitalize text-neutral-300"
              height={20}
              width={150}
            />
            <Skeleton
              className="text-8xl font-bold capitalize tracking-tight"
              height={60}
              width={400}
            />
            <div className="flex items-center gap-x-2">
              <Skeleton circle={true} height={32} width={32} />
              <div className="flex items-center gap-x-2">
                <Skeleton height={20} width={100} />
                <div className="h-[4px] w-[4px] -mr-1 -mb-1 bg-Neutrals-300 rounded-full" />
                <Skeleton height={20} width={80} />
              </div>
            </div>
          </div>
        </div>

        {/* lower div */}
        <div className="flex items-center gap-x-5 mt-6">
          <Skeleton circle={true} height={50} width={50} />
          <Skeleton circle={true} height={50} width={50} />
          <Skeleton circle={true} height={50} width={50} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default BannerSkeleton;
