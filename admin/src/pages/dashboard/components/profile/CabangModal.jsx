import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { SetupModal } from "@/components";
import { useForm } from "react-hook-form";
import { useCreateCabang } from "@/hooks";

export default function CabangModal({ open = false, handleOpen }) {
  const { register, handleSubmit, reset } = useForm();
  const mutation = useCreateCabang();

  const onSubmit = (data) => {
    mutation
      .mutateAsync(data)
      .then((res) => {
        handleOpen();
        reset();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <SetupModal handleOpen={handleOpen} open={open}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mx-auto w-full">
            <CardBody className="flex flex-col w-full gap-4 max-h-96 lg:max-h-[700px] overflow-y-auto">
              <Typography
                variant="h4"
                color="blue-gray"
                className="text-center"
              >
                Tambah Cabang
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
                variant="gradient"
                type="submit"
                fullWidth={true}
                disabled={mutation?.isPending}
              >
                TAMBAH
              </Button>
            </CardFooter>
          </Card>
        </form>
      </SetupModal>
    </>
  );
}
