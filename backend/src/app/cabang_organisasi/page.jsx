import { MainLayout } from "@/layouts";
import React from "react";
import { Section } from "./components";
import { getProfile } from "@/services";

export const metadata = async () => {
  const dataProfile = await getProfile();
  return {
    title: `Cabang ${dataProfile?.data?.name}`,
    description: `Cabang terdekat ${dataProfile?.data?.name}`,
  };
};

const CabangPage = () => {
  return (
    <div className="bg-slate-100 min-h-screen w-full">
      <MainLayout>
        <div className="flex flex-col gap-8">
          <Section />
        </div>
      </MainLayout>
    </div>
  );
};

export default CabangPage;
