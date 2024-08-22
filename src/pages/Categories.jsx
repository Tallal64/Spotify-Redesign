/* eslint-disable react/prop-types */
const Categories = ({ title, img }) => {
  return (
    <div className="relative cursor-pointer overflow-hidden rounded-lg min-w-[430px] min-h-[147px] max-w-[430px] max-h-[147]">
      <h3 className="relative z-20 p-4 text-xl font-semibold">{title}</h3>
      <div className="absolute top-0 left-0 h-full w-full bg-black/35 z-10" />
      <img
        src={img}
        alt="img"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default Categories;
