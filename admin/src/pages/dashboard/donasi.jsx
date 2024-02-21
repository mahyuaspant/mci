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
import { ConfirmModal, MoneyFormat, SetupTabel } from "@/components";
import { useCreateApprovalDonasi, useGetAllDonasi } from "@/hooks";
import { usePagination } from "@/store";
import { Link } from "react-router-dom";

export const Donasi = () => {
  const mutation = useCreateApprovalDonasi();
  const { searchTerm, currentPage } = usePagination();

  const { data: donasiData, isLoading: donasiIsLoad } = useGetAllDonasi({
    searchTerm,
    currentPage,
  });

  return (
    <div className="mt-8">
      <SetupTabel
        tabelTitle={"Donasi"}
        tambah={false}
        data={donasiData}
        isLoading={donasiIsLoad}
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
                "Aksi",
              ].map((el) => (
                <th
                  key={el}
                  className={`border-b border-blue-gray-50 py-3 px-5 ${el == "Aksi" || el == "no" ? "text-center" : "text-left"
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
            {donasiData?.data?.map((item, key) => {
              const className = `py-3 px-5 ${key === donasiData?.data?.length - 1
                  ? ""
                  : "border-b border-blue-gray-50"
                }`;

              return (
                <tr key={key}>
                  <td className={`${className} text-center`}>
                    {key + 1 + 10 * (donasiData.currentPage - 1)}
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
                          {item.donation_amount}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={className}>
                    <Link to={item.donation_proof.url} target="_blank">
                      <Avatar
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
                    <Typography
                      as="div"
                      className="text-xs flex items-center justify-center gap-4 font-semibold text-blue-gray-600"
                    >
                      <Button
                        variant="gradient"
                        color="red"
                        type="submit"
                        disabled={mutation.isPending}
                        onClick={() =>
                          mutation.mutateAsync({
                            id: item._id,
                            approval: false,
                          })
                        }
                      >
                        TOLAK
                      </Button>
                      <Button
                        variant="gradient"
                        disabled={mutation.isPending}
                        color="green"
                        type="submit"
                        onClick={() =>
                          mutation.mutateAsync({
                            id: item._id,
                            approval: true,
                          })
                        }
                      >
                        TERIMA
                      </Button>
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </SetupTabel>
    </div>
  );
};
