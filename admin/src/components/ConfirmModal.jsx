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

export default function ConfirmModal({
  open = false,
  handleOpen,
  onClick,
  isPending,
}) {
  return (
    <>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none "
      >
        <Card className="mx-auto w-full max-w-lg">
          <CardBody className="flex flex-col w-full gap-4 max-h-96 lg:max-h-[700px] overflow-y-auto">
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-start text-lg"
            >
              Konfirmasi
            </Typography>
            <Typography>Kamu yakin ingin menghapus data ini ?</Typography>
            <div className="w-full flex gap-3 justify-end">
              <Button variant="gradient" type="submit" onClick={handleOpen}>
                Batal
              </Button>
              <Button
                onClick={onClick}
                disabled={isPending}
                variant="gradient"
                color="red"
                type="submit"
              >
                Hapus
              </Button>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
