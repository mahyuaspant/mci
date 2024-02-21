import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Input,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { authorsTableData } from "@/data";
import React, { useState } from "react";
import { SetupTabel } from "@/components";
import { TambahModal } from "./components/status";
import { usePagination } from "@/store";
import { useGetAllStatusDonasi } from "@/hooks";
import { Link } from "react-router-dom";

export const Status = () => {
  const { searchTerm, currentPage } = usePagination();
  const { data: statusData, isLoading: statusIsLoad } = useGetAllStatusDonasi({
    searchTerm,
    currentPage,
  });
  const [openTambah, setOpenTambah] = React.useState(false);

  const handleOpenTambah = () => setOpenTambah((cur) => !cur);

  return (
    <div className="mt-8">
      <SetupTabel
        data={statusData}
        isLoading={statusIsLoad}
        tabelTitle={"Status Donasi"}
        tambah={true}
        onClickTambah={handleOpenTambah}
      >
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {[
                "no",
                "nama",
                "tujuan donasi",
                "no telp",
                "jumlah donasi",
                "bukti donasi",
                "pesan",
                "status",
              ].map((el) => (
                <th
                  key={el}
                  className={`border-b border-blue-gray-50 py-3 px-5 ${
                    el == "no" ? "text-center" : "text-left"
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
            {statusData?.data?.map((item, key) => {
              const className = `py-3 px-5 ${
                key === statusData?.data?.length - 1
                  ? ""
                  : "border-b border-blue-gray-50"
              }`;

              return (
                <tr key={key}>
                  <td className={`${className} text-center`}>
                    {key + 1 + 10 * (statusData.currentPage - 1)}
                  </td>
                  <td className={className}>
                    <div className="flex items-center  gap-4">
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {item.name}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={className}>
                    <div className="flex items-center  gap-4">
                      <div>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {item.campaign_title}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={className}>
                    <div className="flex items-center  gap-4">
                      <div>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {item.no_telp}
                        </Typography>
                      </div>
                    </div>
                  </td>

                  <td className={className}>
                    <div className="flex items-center  gap-4">
                      <div>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          Rp {item.donation_amount.toLocaleString("id-ID")}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={className}>
                    <Link target="_blank" to={item.donation_proof.url}>
                      <Avatar
                        className="cursor-pointer"
                        src={item.donation_proof.url}
                        alt={item.name}
                        size="sm"
                        variant="rounded"
                      />
                    </Link>
                  </td>
                  <td className={className}>
                    <div className="flex items-center  gap-4">
                      <div>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {item.message}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={`${className} `}>
                    <Chip
                      variant="gradient"
                      color={item.approval ? "green" : "red"}
                      value={item.approval ? "diterima" : "ditolak"}
                      className="py-0.5 px-2 text-[11px] font-medium w-fit"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </SetupTabel>
      <TambahModal handleOpen={handleOpenTambah} open={openTambah} />
    </div>
  );
};
