const TracksHeading = () => {
  return (
    <>
      <div className="flex items-center gap-x-3 py-2 justify-between w-full px-2 text-sm text-white/55">
        <p className="p-3">#</p>

        <div className="w-[540px] max-w-[540px] flex items-center justify-between gap-x-3">
          <p className="w-full">Title</p>
        </div>

        <div className="flex flex-grow gap-x-4 ml-5 justify-between">
          <p className="flex items-center p-2 w-[600px] max-w-[600px]">Album</p>
          <p className="flex items-center justify-end p-2 w-1/2">
            Release Date
          </p>
          <p className="flex items-center justify-end p-2 w-1/2 ">Duration</p>
        </div>
      </div>
      <div className="h-[1px] w-full bg-Neutrals-700 mb-5" />
    </>
  );
};

export default TracksHeading;
