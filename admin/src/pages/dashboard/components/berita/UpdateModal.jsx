import React, { useEffect, useState } from "react";
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
import { useUpdateBerita } from "@/hooks";

export default function UpdateModal({ open = false, handleOpen, beritaData }) {
  const [html, setHtml] = React.useState("");
  const { register, handleSubmit, setValue, reset } = useForm();
  const mutation = useUpdateBerita()

  const onSubmit = (data) => {
    let body = {
      id: beritaData?._id,
      title: data?.title,
      image: data?.image[0],
      content: html,
    };

    mutation.mutateAsync(body).then((res) => {
      handleOpen()
    })
      .catch((err) => { handleOpen() })
  };


  useEffect(() => {
    setValue("title", beritaData?.title)
    setHtml(beritaData?.content)
  }, [beritaData])
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
                Update Berita
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
                {...register("image")}
              />

              <div className="prose max-w-full w-full">
                <label htmlFor="html" className=" text-black font-medium">
                  Konten :
                </label>
                <TextEditor setHtml={setHtml} html={html} />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" fullWidth={true} disabled={mutation?.isPending}>
                {mutation.isPending ? "LOADING..." : "UPDATE"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </SetupModal>
    </>
  );
}
