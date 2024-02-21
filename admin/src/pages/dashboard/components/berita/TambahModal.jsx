import React, { useState } from "react";
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
  Select,
  Option,
} from "@material-tailwind/react";
import { MoneyFormat, SetupModal, TextEditor } from "@/components";
import { useForm } from "react-hook-form";
import { useCreateBerita } from "@/hooks";

export default function TambahModal({ open = false, handleOpen }) {
  const [html, setHtml] = React.useState("");
  const mutation = useCreateBerita()

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    let body = {
      title: data?.title,
      image: data?.image[0],
      content: html,
    };

    mutation.mutateAsync(body).then((res) => {
      reset()
      handleOpen()
    })
      .catch((err) => { handleOpen() })
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
                Tambah Berita
              </Typography>

              <Input
                label="Judul"
                size="lg"
                {...register("title", { required: true })}
              />

              <Input
                label="Gambar"
                size="lg"
                type="file"
                {...register("image", { required: true })}
              />

              <div className="prose max-w-full w-full">
                <label htmlFor="html" className=" text-black font-medium">
                  Konten :
                </label>
                <TextEditor setHtml={setHtml} html={html} />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" fullWidth={true} disabled={mutation.isPending}>
                {mutation?.isPending ? "LOADING..." : "TAMBAH"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </SetupModal>
    </>
  );
}
