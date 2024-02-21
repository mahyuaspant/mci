import { MainLayout } from "@/layouts";
import { getProfile } from "@/services";

import React from "react";
import { Section } from "./components";

export const metadata = async () => {
  const dataProfile = await getProfile();

  return {
    title: "Berita",
    description: `Berita terkini di ${dataProfile?.data?.name}`,
  };
};

const BeritaPage = async () => {
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

export default BeritaPage;
