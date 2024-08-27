/* eslint-disable react/prop-types */
const MusicComponent = ({ title, img, desc }) => {
  return (
    <div className="h-[330px] w-[225px] max-h-[330px] max-w-[225px] cursor-pointer rounded-lg p-4 overflow-hidden hover:bg-white/5">
      <div className="rounded-lg overflow-hidden">
        <img src={img} alt="img" className="w-full h-full object-cover" />
      </div>
      <div className="overflow-hidden text-center mt-5">
        <p className="capitalize font-medium whitespace-nowrap truncate">
          {title}
        </p>
        <p className="text-sm text-Neutrals-300 whitespace-nowrap truncate">{desc}</p>
      </div>
    </div>
  );
};

export default MusicComponent;
