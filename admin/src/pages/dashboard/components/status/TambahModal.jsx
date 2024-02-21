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
  Switch,
  Select,
  Option,
} from "@material-tailwind/react";
import { MoneyFormat, SetupModal } from "@/components";
import { useForm } from "react-hook-form";
import { useCreateStatusDonasi, useGetAllCampaign } from "@/hooks";

export default function TambahModal({ open = false, handleOpen }) {
  const { register, handleSubmit, reset } = useForm();
  const [campaignTitle, setCampaignTitle] = useState(null);
  const { data: campaignData } = useGetAllCampaign({
    currentPage: 1,
    limit: 999,
    searchTerm: "",
  });
  const mutation = useCreateStatusDonasi();

  const [nominal, setNominal] = useState("0");

  const onSubmit = (data) => {
    if (!nominal) {
      return alert("Target Tidak Boleh Kosong");
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("no_telp", data.no_telp);
    formData.append("email", data.email);
    formData.append("isAnonymous", data.isAnonymous);
    formData.append("donation_proof", data.donation_proof[0]);
    formData.append("campaign_title", campaignTitle);
    formData.append("donation_amount", parseInt(nominal.replaceAll(",", "")));
    formData.append("message", data.message);

    mutation.mutateAsync(formData)
      .then((res) => {
        handleOpen()
        reset()
        setNominal("0")
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
                Tambah Donasi
              </Typography>

              <Input
                label="Nama"
                size="lg"
                {...register("name", { required: true })}
              />
              <Input
                label="No Telp"
                size="lg"
                type="number"
                {...register("no_telp", { required: true })}
              />
              <Input
                label="Email"
                size="lg"
                {...register("email", { required: true })}
              />
              <div className="items-center flex gap-4">
                <label htmlFor="anonim">Sembunyikan data donatur?</label>
                <Switch {...register("isAnonymous")} />
              </div>

              <div className="prose max-w-full w-full">
                <label htmlFor="html" className=" text-black text-sm">
                  Jumlah Donasi :
                </label>
                <MoneyFormat
                  value={nominal}
                  defaultValue={nominal}
                  setValue={setNominal}
                />
              </div>
              <Select
                size="lg"
                label="Kategori"
                className="text-black py-5"
                onChange={(e) => setCampaignTitle(e)}
              >
                {campaignData?.data?.map((item) => {
                  return (
                    <Option key={item._id} value={item.title}>{item.title}</Option>
                  )
                })}

              </Select>
              <Input
                label="Bukti Transfer"
                size="lg"
                type="file"
                {...register("donation_proof", { required: true })}
              />
              <Textarea label="Pesan" {...register("message")} />
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" fullWidth={true} disabled={mutation.isPending}>
                {!mutation.isPending ? "TAMBAH" : "LOADING..."}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </SetupModal>
    </>
  );
}
