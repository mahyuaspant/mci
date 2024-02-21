import React, { useEffect } from "react";
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
import { useUpdateProfile } from "@/hooks";

export default function ProfileModal({
  open = false,
  handleOpen,
  profileData,
}) {
  const { register, handleSubmit, setValue } = useForm();
  const mutation = useUpdateProfile();

  const onSubmit = (data) => {
    let body = {
      id: profileData?._id,
      name: data.name,
      logo: data.logo[0],
      about_us: data.about_us,
      address: data.address,
      no_telp: data.no_telp,
      facebook: data.facebook,
      instagram: data.instagram,
      bank_name: data.bank_name,
      bank_number: data.bank_number,
      bank_owner: data.bank_owner,
      bank_logo: data.bank_logo[0],
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

  useEffect(() => {
    setValue("name", profileData?.name);
    setValue("address", profileData?.address);
    setValue("about_us", profileData?.about_us);
    setValue("no_telp", profileData?.no_telp);
    setValue("facebook", profileData?.facebook);
    setValue("instagram", profileData?.instagram);
    setValue("bank_name", profileData?.bank_name);
    setValue("bank_owner", profileData?.bank_owner);
    setValue("bank_number", profileData?.bank_number);
  }, [open]);
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
                Perbarui Profile
              </Typography>

              <Input
                label="Nama Profile"
                size="lg"
                {...register("name", { required: true })}
              />

              <Input
                label="Alamat"
                size="lg"
                {...register("address", { required: true })}
              />

              <Textarea
                label="Tentang Kami"
                size="lg"
                {...register("about_us", { required: true })}
              />

              <Input
                label="Photo Profile"
                size="lg"
                type="file"
                {...register("logo")}
              />

              <Input
                label="Nomor Telepon"
                size="lg"
                type="number"
                {...register("no_telp", { required: true })}
              />

              <Input
                label="Facebook"
                size="lg"
                {...register("facebook", { required: true })}
              />

              <Input
                label="Instagram"
                size="lg"
                {...register("instagram", { required: true })}
              />

              <Input
                label="Nama Bank"
                size="lg"
                {...register("bank_name", { required: true })}
              />
              <Input
                label="Logo Bank"
                size="lg"
                type="file"
                {...register("bank_logo")}
              />
              <Input
                label="Nomor Rekening"
                size="lg"
                {...register("bank_number", { required: true })}
              />

              <Input
                label="Atas Nama"
                size="lg"
                {...register("bank_owner", { required: true })}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                type="submit"
                fullWidth={true}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Loading..." : "PERBARUI"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </SetupModal>
    </>
  );
}
