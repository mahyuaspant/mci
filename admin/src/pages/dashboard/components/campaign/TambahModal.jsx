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
import { useCreateCampaign, useGetAllPublicKategori } from "@/hooks";

export default function TambahModal({ open = false, handleOpen }) {
  const [html, setHtml] = React.useState("");
  const { data: kategoriData } = useGetAllPublicKategori();
  const [amountTarget, setAmountTarget] = useState("0");
  const [categorie, setCategorie] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const mutation = useCreateCampaign();

  const onSubmit = (data) => {
    if (!amountTarget) {
      return alert("Target Tidak Boleh Kosong");
    }
    let body = {
      title: data?.title,
      categorie: categorie,
      image: data?.image[0],
      start_date: data?.start_date,
      end_date: data?.end_date,
      target_contribution: parseInt(amountTarget.replace(/,/g, "").toString()),
      current_contribution: 0,
      description: html,
    };

    mutation
      .mutateAsync(body)
      .then((res) => {
        handleOpen();
        reset();
        setHtml("");
        setAmountTarget("0");
      })
      .catch((err) => {
        handleOpen();
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
                Tambah Campaign
              </Typography>

              <Input
                label="Judul"
                size="lg"
                {...register("title", { required: true })}
              />

              <Select
                size="lg"
                label="Kategori"
                className="text-black py-5"
                onChange={(e) => setCategorie(e)}
              >
                {kategoriData?.data?.map((item) => {
                  return (
                    <Option key={item._id} value={item.name}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>

              <Input
                label="Gambar"
                size="lg"
                type="file"
                {...register("image", { required: true })}
              />

              <Input
                label="Tanggal Mulai"
                size="lg"
                type="date"
                defaultValue={new Date().toISOString().substring(0, 10)}
                {...register("start_date")}
              />
              <Input
                label="Tanggal Berakhir"
                size="lg"
                type="date"
                {...register("end_date", { required: true })}
              />
              <div className="prose max-w-full w-full">
                <label htmlFor="html" className=" text-black font-medium">
                  Target :
                </label>
                <MoneyFormat
                  value={amountTarget}
                  defaultValue={amountTarget}
                  setValue={setAmountTarget}
                />
              </div>

              <div className="prose max-w-full w-full">
                <label htmlFor="html" className=" text-black font-medium">
                  Konten :
                </label>
                <TextEditor setHtml={setHtml} html={html} />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                type="submit"
                fullWidth={true}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Loading..." : "tambah"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </SetupModal>
    </>
  );
}
