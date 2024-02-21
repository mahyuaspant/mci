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
import { useCreateCarousel } from "@/hooks";

export default function TambahModal({ open = false, handleOpen }) {
  const { register, handleSubmit, reset } = useForm();
  const mutation = useCreateCarousel();

  const onSubmit = (data) => {
    let body = {
      image: data?.image[0],
    };

    mutation
      .mutateAsync(body)
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
                Tambah Carousel
              </Typography>

              <Input
                label="Gambar"
                size="lg"
                type="file"
                {...register("image", { required: true })}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                type="submit"
                fullWidth={true}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Loading..." : "TAMBAH"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </SetupModal>
    </>
  );
}
