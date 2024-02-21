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
import { useGetAllPublicKategori, useUpdateCampaign } from "@/hooks";

export default function UpdateModal({
  open = false,
  handleOpen,
  dataCampaign,
}) {
  const [html, setHtml] = React.useState("");
  const mutation = useUpdateCampaign();
  const { data: kategoriData } = useGetAllPublicKategori();
  const [amountTarget, setAmountTarget] = useState("0");
  const [categorie, setCategorie] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    if (!amountTarget) {
      return alert("Target Tidak Boleh Kosong");
    }
    let body = {
      id: dataCampaign._id,
      title: data?.title,
      categorie: categorie,
      image: data?.image[0],
      end_date: data?.end_date,
      target_contribution: parseInt(amountTarget.replace(/,/g, "").toString()),
      current_contribution: 0,
      description: html,
    };

    mutation
      .mutateAsync(body)
      .then((res) => {
        handleOpen();
      })
      .catch((err) => {
        handleOpen();
      });
  };
  useEffect(() => {
    setValue("title", dataCampaign?.title);

    setCategorie(dataCampaign?.categorie);
    setValue("start_date", dataCampaign?.start_date);
    setValue("end_date", dataCampaign?.end_date);
    setValue("target_contribution", dataCampaign?.target_contribution);
    setHtml(dataCampaign?.description);
    setAmountTarget(dataCampaign?.target_contribution?.toString());
  }, [dataCampaign]);
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
                Update Campaign
              </Typography>

              <Input
                label="Judul"
                size="lg"
                {...register("title", { required: true })}
              />

              <Select
                size="lg"
                label="Kategori"
                defaultValue={categorie}
                value={categorie}
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
                {...register("image")}
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
                {mutation.isPending ? "Loading..." : "UPDATE"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </SetupModal>
    </>
  );
}
