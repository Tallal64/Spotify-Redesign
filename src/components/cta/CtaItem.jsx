/* eslint-disable react/prop-types */

const CtaItem = ({ title, desc, img }) => {
  return (
    <div
      className={`cursor-pointer flex p-[30px] rounded-[10px] bg-white/5 min-w-[430px] min-h-[147px] max-w-[430px] max-h-[147]`}
    >
      <div className="flex w-full gap-[30px]">
        {/* img */}
        <div>
          <div className={`h-[87px] w-[87px]`}>
            <img
              src={img}
              alt="img"
              className={`rounded-[10px]`}
              height={100}
              width={100}
            />
          </div>
        </div>
        {/* text */}
        <div className={`overflow-hidden w-full flex flex-col justify-center`}>
          <p
            className={`whitespace-nowrap truncate w-full text-xl font-medium`}
          >
            {title}
          </p>
          <p className="capitalize text-Neutrals-300 text-base whitespace-nowrap truncate w-full mb-1 mt-[2px]">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CtaItem;
