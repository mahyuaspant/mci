import React from "react";

import { SetupModal } from "@/components";

export default function BuktiModal({ open = false, handleOpen }) {
  return (
    <>
      <SetupModal handleOpen={handleOpen} open={open}>
        <img
          alt="Bukti Transfer"
          className="h-[20rem] lg:h-[30rem] xl:h-[42rem] w-full rounded-lg object-cover object-center"
          src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
        />
      </SetupModal>
    </>
  );
}
