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
import React from "react";
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { usePagination } from "@/store";

export function PaginationButton({ data, nextPage, prevPage, currentPage }) {
  const next = () => {
    if (currentPage >= data?.totalPages) return;
    console.log("currentPage");

    nextPage();
  };

  const prev = () => {
    if (currentPage === 1) return;

    prevPage();
  };

  return (
    <div className={`flex items-center gap-2`}>
      <IconButton
        size="sm"
        variant="outlined"
        color="white"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-3 w-3 text-white" />
      </IconButton>
      <Typography color="gray" className="text-xs font-normal text-white">
        Page <strong className=" text-xs">{currentPage}</strong> of{" "}
        <strong className=" text-xs">{data?.totalPages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        color="white"
        onClick={next}
        disabled={currentPage === data?.totalPages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-3 w-3 text-white" />
      </IconButton>
    </div>
  );
}

const SetupTabel = ({
  data,
  search = true,
  isLoading,
  onClickTambah,
  children,
  tabelTitle,
  tambah = true,
  cardHeader,
}) => {
  const {
    currentPage,
    nextPage,
    prevPage,
    resetPage,
    setSearchTerm,
    resetSearch,
  } = usePagination();
  let searchTimeout;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Menghapus timeout sebelumnya (jika ada)
    clearTimeout(searchTimeout);

    // Mengatur timeout baru
    searchTimeout = setTimeout(() => {
      setSearchTerm(inputValue); // Set the search
      resetPage();
    }, 1000); // Penundaan 2 detik (2000 ms)
  };
  React.useEffect(() => {
    resetSearch();
    resetPage();
  }, []);
  return (
    <Card>
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-5 p-4 flex flex-col md:flex-row items-center justify-between"
      >
        <div className="flex flex-col items-center">
          <Typography variant="h6" color="white">
            {tabelTitle}
          </Typography>
          <small>Total : {data?.total}</small>
          <PaginationButton
            data={data}
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
        <div className="mr-auto flex flex-col mt-3 lg:mt-0 md:flex-row w-full gap-2 md:mr-4 max-w-xs mx-auto md:mx-0 p-1 bg-white rounded-xl">
          {search && (
            <input
              className="border px-3 text-black border-gray-400 rounded-lg py-2"
              placeholder="Search..."
              label="Search"
              onChange={handleInputChange}
              size="md"
            />
          )}
          <Button
            className={`w-full ${!tambah && "hidden"}`}
            onClick={onClickTambah}
          >
            Tambah
          </Button>
        </div>
      </CardHeader>

      {isLoading ? (
        <div class=" flex justify-center flex-col gap-5 items-center py-20">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
          Loading...
        </div>
      ) : (
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {children}
        </CardBody>
      )}
    </Card>
  );
};

export default SetupTabel;
