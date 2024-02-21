import { MainLayout } from "@/layouts";
import React from "react";
import { Section } from "./components";
import { getProfile } from "@/services";

export const metadata = async () => {
  const dataProfile = await getProfile();
  return {
    title: "Eksplorasi",
    description: `Cari campaign di ${dataProfile?.data?.name}`,
  };
};

const Eksplorasi = async () => {
  return (
    <div className="bg-slate-100 min-h-screen w-full">
      <MainLayout>
        <div className="w-full h-full flex flex-col gap-5">
          <Section />
        </div>
      </MainLayout>
    </div>
  );
};

export default Eksplorasi;
