import React from "react";
import { KembaliButton } from "../components";
import Image from "next/image";
import Notifikasi from "../../../assets/images/notifikasi.webp";

const NotifikasiPage = () => {
  return (
    <div className="bg-slate-100 min-h-screen w-full flex items-center justify-center ">
      <div className="flex min-h-screen flex-col mx-auto w-full h-full gap-5 p-5 max-w-2xl bg-white pb-36">
        <KembaliButton isBeranda={true} />
        <div className="flex w-full h-full flex-col gap-5 items-center justify-center my-auto">
          <Image
            src={Notifikasi}
            alt="Notifikasi Berhasil"
            className="w-52 h-52 lg:w-72 lg:h-72 mx-auto"
          />
          <span className="text-center max-w-xs sm:max-w-xl text-black font-bold">
            Terima kasih sudah menyalurkan dana. Anda akan merima konfirmasi
            dari kami melalui email.
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotifikasiPage;
