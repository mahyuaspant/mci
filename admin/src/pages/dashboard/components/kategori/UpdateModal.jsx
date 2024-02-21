import { SetupModal } from "@/components";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";

export default function UpdateModal({ open = false, handleOpen }) {
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data) => {
    let body = {
      name: data?.name,
      icon: data?.icon[0],
    };

    console.log(body);
  };

  return (
    <SetupModal handleOpen={handleOpen} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col w-full gap-4 max-h-96 lg:max-h-[700px] overflow-y-auto">
            <Typography variant="h4" color="blue-gray" className="text-center">
              Update Kategori
            </Typography>

            <Input
              label="Nama"
              size="lg"
              {...register("name", { required: true })}
            />

            <Input
              label="Icon"
              size="lg"
              type="file"
              {...register("icon", { required: true })}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" type="submit" fullWidth={true}>
              TAMBAH
            </Button>
          </CardFooter>
        </Card>
      </form>
    </SetupModal>
  );
}
