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
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ConfirmModal, SetupTabel } from "@/components";
import { TambahModal, UpdateModal } from "./components/campaign";
import { Link } from "react-router-dom";
import { usePagination } from "@/store";
import { useDeleteCampaign, useGetAllCampaign } from "@/hooks";

export const Campaign = () => {
  const { searchTerm, currentPage } = usePagination();
  const [clicked, setClicked] = useState(null);
  const mutation = useDeleteCampaign();
  const { data: campaignData, isLoading: campaignIsLoad } = useGetAllCampaign({
    searchTerm,
    currentPage,
  });

  const [openTambah, setOpenTambah] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [remove, setRemove] = React.useState(false);
  const handleOpenTambah = () => setOpenTambah((cur) => !cur);
  const handleOpenUpdate = (item) => {
    setClicked(item);
    setOpenUpdate((cur) => !cur);
  };
  const handleOpenRemove = (item) => {
    setClicked(item);
    setRemove((cur) => !cur);
  };

  return (
    <div className="mt-8">
      <SetupTabel
        onClickTambah={handleOpenTambah}
        tabelTitle={"Campaign"}
        data={campaignData}
        isLoading={campaignIsLoad}
      >
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "no",
                "judul",
                "kategori",
                "tanggal berakhir",
                "target",
                "terkumpul",
                "konten",
                "Aksi",
              ].map((el) => (
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
            {campaignData?.data?.map((item, key) => {
              const className = `py-3 px-5 ${
                key === authorsTableData.length - 1
                  ? ""
                  : "border-b border-blue-gray-50"
              }`;

              return (
                <tr key={key}>
                  <td className={`${className} text-center`}>
                    {key + 1 + 10 * (campaignData.currentPage - 1)}
                  </td>
                  <td className={className}>
                    <div className="flex items-center  gap-4">
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {item.title}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={className}>
                    <div className="flex items-center  gap-4">
                      <div>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {item.categorie}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={className}>
                    <div className="flex items-center  gap-4">
                      <div>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {item.end_date}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={className}>
                    <div className="flex items-center  gap-4">
                      <div>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          Rp {item.target_contribution.toLocaleString("id-ID")}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={className}>
                    <div className="flex items-center  gap-4">
                      <div>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          Rp {item.current_contribution.toLocaleString("id-ID")}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={className}>
                    <Link
                      target="_blank"
                      to={`https://mcikalsel.my.id/detail_campaign/${item._id}`}
                      className="cursor-pointer underline"
                    >
                      Lihat
                    </Link>
                  </td>
                  <td className={`${className} `}>
                    <Typography
                      as="div"
                      className="text-xs flex items-center justify-center gap-4 font-semibold text-blue-gray-600"
                    >
                      <span
                        className="cursor-pointer text-green-600"
                        onClick={() => {
                          handleOpenUpdate(item);
                        }}
                      >
                        Update
                      </span>
                      <span
                        onClick={() => {
                          handleOpenRemove(item);
                        }}
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
        handleOpen={handleOpenRemove}
        open={remove}
        isPending={mutation.isPending}
        onClick={() => {
          mutation
            .mutateAsync({ id: clicked?._id })
            .then((res) => {
              handleOpenRemove();
            })
            .catch((err) => {
              handleOpenRemove();
            });
        }}
      />
      <TambahModal handleOpen={handleOpenTambah} open={openTambah} />
      <UpdateModal
        handleOpen={handleOpenUpdate}
        open={openUpdate}
        dataCampaign={clicked}
      />
    </div>
  );
};
