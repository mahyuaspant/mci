import { SetupModal } from "@/components";
import { useUpdateCabang } from "@/hooks";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const CabangUpdateModal = ({ open = false, handleOpen, dataCabang }) => {
  const { register, handleSubmit, setValue } = useForm();
  const mutation = useUpdateCabang();

  const onSubmit = (data) => {
    let body = {
      id: dataCabang?._id,
      name: data?.name,
      address: data?.address,
      no_telp: data?.no_telp,
    };
    mutation
      .mutateAsync(body)
      .then((res) => {
        handleOpen();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log(dataCabang);
  useEffect(() => {
    setValue("name", dataCabang?.name);
    setValue("address", dataCabang?.address);
    setValue("no_telp", dataCabang?.no_telp);
  }, [dataCabang]);
  return (
    <SetupModal handleOpen={handleOpen} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col w-full gap-4 max-h-96 lg:max-h-[700px] overflow-y-auto">
            <Typography variant="h4" color="blue-gray" className="text-center">
              Update Cabang
            </Typography>

            <Input
              label="Nama"
              size="lg"
              {...register("name", { required: true })}
            />

            <Input
              label="Alamat"
              size="lg"
              {...register("address", { required: true })}
            />

            <Input
              label="Nomor Whatsapp"
              size="lg"
              type="number"
              {...register("no_telp", { required: true })}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              disabled={mutation.isPending}
              variant="gradient"
              type="submit"
              fullWidth={true}
            >
              Update
            </Button>
          </CardFooter>
        </Card>
      </form>
    </SetupModal>
  );
};

export default CabangUpdateModal;
