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
import { Link } from "react-router-dom";
import { useDeleteCabang } from "@/hooks";
import { CabangUpdateModal } from "..";

const CabangTab = ({ setOpen, data, isLoading }) => {
  const [clicked, setClicked] = useState(null);
  const mutation = useDeleteCabang();
  const [openCabangUpdate, setOpenCabangUpdate] = React.useState(false);
  const handleOpenCabangUpdate = () => setOpenCabangUpdate((cur) => !cur);

  const [deleteCabang, setDeleteCabang] = React.useState(false);
  const handleOpenDelete = () => setDeleteCabang((cur) => !cur);

  const handleOpenUpdate = (item) => {
    setClicked(item);
    setOpenCabangUpdate(true);
  };

  const handleDeleteCabang = (item) => {
    setClicked(item);
    setDeleteCabang(true);
  };

  return (
    <>
      <SetupTabel
        data={data}
        onClickTambah={setOpen}
        tabelTitle={"Cabang"}
        isLoading={isLoading}
      >
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["no", "nama", "alamat", "nomor whatsapp", "Aksi"].map((el) => (
                <th
                  key={el}
                  className={`border-b border-blue-gray-50 py-3 px-5 ${
                    el == "Aksi" ? "text-center" : "text-left"
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
            {data?.data?.map((item, index) => {
              const className = `py-3 px-5 ${
                index === data?.data?.length - 1
                  ? ""
                  : "border-b border-blue-gray-50"
              }`;

              return (
                <tr key={index}>
                  <td className={className}>
                    {index + 1 + 5 * (data.currentPage - 1)}
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {item.name}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-normal text-blue-gray-500">
                      {item.address}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-normal text-blue-gray-500">
                      <Link>{item.no_telp}</Link>
                    </Typography>
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
                          handleDeleteCabang(item);
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
        handleOpen={handleOpenDelete}
        isPending={mutation.isPending}
        open={deleteCabang}
        onClick={() => {
          mutation
            .mutateAsync({ id: clicked._id })
            .then((res) => {
              handleOpenDelete();
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      />

      <CabangUpdateModal
        dataCabang={clicked}
        handleOpen={handleOpenCabangUpdate}
        open={openCabangUpdate}
      />
    </>
  );
};

export default CabangTab;
