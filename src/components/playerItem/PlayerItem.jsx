/* eslint-disable react/prop-types */
const PlayerItem = ({
  index,
  img,
  title,
  desc,
  albumName,
  dateAdded,
  time,
}) => {
  // /* Function to convert time from MS to MM:SS */
  function formatDuration(durationMs) {
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  let convertTime = formatDuration(time);

  /* Function to format the date */
  function formatReleaseDate(dateString) {
    const date = new Date(dateString);

    if (!dateString) {
      return "Unknown Date";
    }
    if (isNaN(date.getTime())) {
      return "Unknown Date";
    }
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(date);
  }
  let formatDate = formatReleaseDate(dateAdded);

  return (
    <div className="flex w-full gap-x-4 py-2 px-2 justify-between cursor-pointer rounded-lg hover:bg-white/5">
      <div className="flex items-center justify-center p-3 text-Neutrals-300">
        {index}
      </div>

      <div className="flex items-center gap-x-3 overflow-hidden w-[540px] max-w-[540px]">
        <div className="min-h-12 min-w-12 max-h-12 max-w-12 ">
          <img className="h-full w-full object-cover" src={img} alt="img" />
        </div>
        <div className="flex flex-col justify-center truncate w-full">
          <p className="whitespace-nowrap truncate">{title}</p>
          <p className="whitespace-nowrap truncate text-sm text-Neutrals-300">
            {desc}
          </p>
        </div>
      </div>

      <div className="flex flex-grow gap-x-4 ml-5">
        <div className="flex items-center p-2 text-Neutrals-300 w-[600px] max-w-[600px] overflow-hidden">
          <span className="whitespace-nowrap truncate overflow-hidden text-sm">
            {albumName}
          </span>
        </div>

        <div className="flex items-center justify-end p-2 text-sm text-Neutrals-300 w-1/2">
          <span>{formatDate}</span>
        </div>

        <div className="flex items-center justify-end p-2  text-sm text-Neutrals-300 w-1/2">
          <span>{convertTime}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerItem;
