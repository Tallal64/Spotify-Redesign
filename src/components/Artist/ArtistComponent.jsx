/* eslint-disable react/prop-types */
const ArtistComponent = ({ img, title, desc }) => {
  return (
    <div className="flex flex-col items-center rounded-lg gap-y-4 min-w-[200px] min-h-[260px] max-w-[201px] max-h-[260px] p-4 cursor-pointer hover:bg-white/5">
      <div className=" rounded-full overflow-hidden max-w-[170px] max-h-[170px]">
        <img src={img} alt="img" className="h-full w-full object-cover" />
      </div>

      <div className=" flex flex-col items-center overflow-hidden w-full">
        <h2 className=" font-medium capitalize whitespace-nowrap truncate text-center w-full">
          {title}
        </h2>
        <p className="text-Neutrals-300 text-sm capitalize">{desc}</p>
      </div>
    </div>
  );
};

export default ArtistComponent;
