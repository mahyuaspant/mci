import Image from "next/image";

const FeatureCircle = ({ imageSrc, text, icon, onClick }) => {
  return (
    <div
      className="flex cursor-pointer group flex-col h-full items-center justify-between"
      onClick={onClick}
    >
      <div className="w-16 h-16 rounded-full bg-[#fff9f9] group-hover:bg-yellow-400 transition-all duration-500 flex items-center justify-center">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={text}
            width={0}
            height={0}
            sizes="100vw"
            className="w-12 lg:w-16 h-12 lg:h-16"
          />
        )}
        {icon && icon}
      </div>
      <span className="text-center mt-2 font-semibold text-xs sm:text-base flex-1">
        {text}
      </span>
    </div>
  );
};

export default FeatureCircle;
