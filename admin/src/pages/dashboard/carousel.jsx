import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Input,
  CardFooter,
} from "@material-tailwind/react";
import { authorsTableData } from "@/data";
import React, { useState } from "react";
import { ConfirmModal, SetupTabel } from "@/components";
import { TambahModal } from "./components/carousel";
import { useDeleteCarousel, useGetAllCarousel } from "@/hooks";
import { usePagination } from "@/store";
import { Link } from "react-router-dom";

export const Carousel = () => {
  const [clicked, setClicked] = useState(null);
  const mutation = useDeleteCarousel();
  const { searchTerm, currentPage } = usePagination();
  const { data: carouselData, isLoading: carouselIsLoad } = useGetAllCarousel({
    searchTerm,
    currentPage,
  });

  const [openTambah, setOpenTambah] = React.useState(false);
  const [remove, setRemove] = React.useState(false);
  const handleOpenTambah = () => setOpenTambah((cur) => !cur);
  const handleOpenRemove = (item) => {
    setRemove((cur) => !cur);
    setClicked(item);
  };

  return (
    <div className="mt-8">
      <SetupTabel
        onClickTambah={handleOpenTambah}
        tabelTitle={"Carousel"}
        data={carouselData}
        isLoading={carouselIsLoad}
        search={false}
      >
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["no", "gambar", "Aksi"].map((el) => (
                <th
                  key={el}
                  className={`border-b border-blue-gray-50 py-3 px-5 ${
                    el == "Aksi" || el == "no" ? "text-center" : "text-left"
                  }`}
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {carouselData?.data?.map((item, key) => {
              const className = `py-3 px-5 ${
                key === authorsTableData.length - 1
                  ? ""
                  : "border-b border-blue-gray-50"
              }`;

              return (
                <tr key={key}>
                  <td className={`${className} text-center`}>
                    {" "}
                    {key + 1 + 10 * (carouselData.currentPage - 1)}
                  </td>

                  <td className={className}>
                    <Link target="_blank" to={item.image.url}>
                      <Avatar
                        className="cursor-pointer"
                        src={item.image.url}
                        alt={item.image.url}
                        size="sm"
                        variant="rounded"
                      />
                    </Link>
                  </td>

                  <td className={`${className} `}>
                    <Typography
                      as="div"
                      className="text-xs flex items-center justify-center gap-4 font-semibold text-blue-gray-600"
                    >
                      <span
                        onClick={() => handleOpenRemove(item)}
                        className="cursor-pointer text-red-600"
                      >
                        Hapus
                      </span>
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </SetupTabel>
      <ConfirmModal
        isPending={mutation.isPending}
        handleOpen={handleOpenRemove}
        open={remove}
        onClick={() => {
          mutation
            .mutateAsync({ id: clicked?._id })
            .then((res) => {
              handleOpenRemove();
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      />
      <TambahModal handleOpen={handleOpenTambah} open={openTambah} />
    </div>
  );
};
