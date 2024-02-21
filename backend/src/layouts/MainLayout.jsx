import { Navbar } from "@/components";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="flex relative justify-center">
      <Navbar />
      <div className="flex min-h-screen pb-28 flex-col mx-auto w-full gap-5 p-5 max-w-2xl bg-white ">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
