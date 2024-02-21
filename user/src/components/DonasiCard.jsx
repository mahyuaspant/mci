import Image from "next/image";
import Link from "next/link";

const DonasiCard = ({
  isExplorasi = false,
  current_contribution,
  image,
  title,
  categorie,
  remainingDays,
  progress,
  _id,
}) => {
  return (
    <Link
      href={`/detail_campaign/${_id}`}
      className={`flex flex-col ${
        isExplorasi && "p-3 lg:p-8"
      } border rounded-lg`}
    >
      <Image
        src={image?.url}
        alt={image?.url}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full object-cover h-44 lg:h-52 mx-auto"
      />
      <div
        className={`flex flex-col gap-[10px] ${isExplorasi ? "pt-5" : "p-3"}`}
      >
        <div className="flex flex-col ">
          <h3 className="truncate font-semibold text-sm sm:text-base">
            {title}
          </h3>
        </div>
        <div className="flex justify-between">
          <span className="font-light text-gray-400 text-xs sm:text-base">
            {categorie}
          </span>
          <span className="text-xs sm:text-base">{remainingDays} Hari</span>
        </div>
        <progress
          className="progress progress-warning bg-[#FFF9F9]"
          value={progress}
          max="100"
        ></progress>
        <div className="flex justify-between items-center flex-row">
          <span className="font-semibold text-xs sm:text-base">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(current_contribution)}
          </span>
          {progress == 100 ? (
            <span className="text-xs sm:text-base text-green-600">
              Terkumpul
            </span>
          ) : (
            <span className="text-xs sm:text-base text-red-600">Proses</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DonasiCard;
