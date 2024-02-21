"use client";
import React, { useEffect, useState } from "react";
import { KembaliButton } from "../components";
import LogoMCI from "../../../assets/images/logo.webp";
import Image from "next/image";
import { FaCopy } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";
import { BsFillImageFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { NumericFormat } from "react-number-format";
import { getCampaign, getProfile } from "@/services";
import copy from "copy-to-clipboard";
import { postDonasi } from "@/services/donasi";

const FormKonfirmasi = () => {
  const router = useRouter();
  const [succesCopy, setSuccessCopy] = useState(false);
  const [nominal, setNominal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignData, setCampaignData] = useState([]);
  const [profileData, setProfileData] = useState();
  const { handleSubmit, register, watch } = useForm();
  async function getDataCampaign() {
    const result = await getCampaign();
    return result;
  }
  async function getDataProfile() {
    const result = await getProfile();
    return result;
  }

  const onSubmit = async (data) => {
    if (nominal == 0) {
      return alert("Nominal harus diisi");
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", data.nama);
    formData.append("no_telp", data.no_telp);
    formData.append("email", data.email);
    formData.append("isAnonymous", data.anonim);
    formData.append("donation_proof", data.bukti_transfer[0]);
    formData.append("campaign_title", data.campaign_title);
    formData.append("donation_amount", parseInt(nominal.replaceAll(",", "")));
    formData.append("message", data.pesan);

    const result = await postDonasi(formData);

    if (!result.success) {
      setIsLoading(false);
      alert(result.message);
      return;
    }

    router.push("/detail_campaign/notifikasi");
  };
  // console.log(campaignData);
  useEffect(() => {
    getDataCampaign()
      .then((data) => {
        setCampaignData(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
    getDataProfile()
      .then((res) => {
        setProfileData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="bg-slate-100 min-h-screen w-full flex items-center justify-center ">
      <div className="flex min-h-screen flex-col mx-auto w-full gap-5 p-5 max-w-2xl bg-white pb-10">
        <KembaliButton />
        <div className="flex flex-col border shadow-md gap-3 p-5 rounded-lg">
          <h2 className="font-bold text-sm sm:text-base">Cara kirim dana</h2>
          <p className="text-xs sm:text-sm">
            Silahkan transfer melalui pilihan rekening di bawah ini, kemudian
            isi form konfirmasinya dengan meupload bukti transfer.
          </p>
          <div className="flex gap-5  w-full h-full">
            <div className="">
              <Image
                src={profileData?.data?.bank_logo?.url}
                alt="Logo Bank"
                width={0}
                height={0}
                sizes="100vw"
                className=" h-28 w-full rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 sm:gap-3 w-full">
              <div className="flex justify-between flex-col sm:flex-row text-sm sm:text-base">
                <span className="font-bold">
                  {profileData?.data?.bank_number}
                </span>
                <div className="flex flex-col gap-1">
                  <span
                    onClick={() => {
                      setSuccessCopy(true);
                      copy(profileData?.data?.bank_number);
                      setTimeout(() => {
                        setSuccessCopy(false);
                      }, 1000);
                    }}
                    className="text-green-400 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <FaCopy />
                    {!succesCopy ? (
                      "Salin nomor"
                    ) : (
                      <span className="text-black">Berhasil disalin</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="flex w-full justify-between">
                <span className="text-xs sm:text-sm">
                  a.n. {profileData?.data?.bank_owner}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex pl-1 items-center">
          <IoIosAlert size={40} className="text-[#F2994A]" />
          <span className="text-xs sm:text-sm font-semibold px-5 text-[#F2994A]">
            Silahkan transfer dengan{" "}
            <span className="text-black font-bold ">Kode Unik 002</span> pada
            ujung nominal transfer.{" "}
            <span className="text-black font-bold "> Contoh Rp 100.002</span>
          </span>
        </div>
        <div className="w-full h-full">
          <button className="max-w-xs bg-yellow-400 text-black font-semibold text-sm sm:text-base flex items-center justify-center px-20 w-full py-2 rounded-full cursor-default">
            Konfirmasi
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col gap-3">
            <input
              type="text"
              className="input bg-[#f2f2f2] rounded-md text-xs sm:text-sm"
              placeholder="Nama"
              {...register("nama", { required: true })}
            />
            <input
              className="input bg-[#f2f2f2] rounded-md text-xs sm:text-sm"
              placeholder="No. Whatsapp"
              type="number"
              {...register("no_telp", { required: true })}
            />
            <input
              type="email"
              className="input bg-[#f2f2f2] rounded-md text-xs sm:text-sm"
              placeholder="Email Aktif"
              {...register("email", { required: true })}
            />
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm sm:text-base">
                Salurkan Dana Sebagai Anonim (Tanpa Nama)
              </span>
              <input
                type="checkbox"
                className="toggle toggle-success"
                {...register("anonim")}
              />
            </div>
            {/* <input
              type="number"
              className="input bg-[#f2f2f2] rounded-md text-xs sm:text-sm"
              placeholder="Nominal Transfer"
              {...register("nominal", { required: true })}
            /> */}
            <div className="flex gap-2 w-full items-center">
              <span>Rp. </span>
              <NumericFormat
                allowLeadingZeros
                thousandSeparator=","
                className="input bg-[#f2f2f2] w-full rounded-md text-xs sm:text-sm"
                placeholder="Masukkan Nominal"
                onChange={(e) => {
                  setNominal(e.target.value);
                }}
              />
            </div>
            <select
              {...register("campaign_title", { required: true })}
              className="input text-xs sm:text-sm  bg-[#f2f2f2] cursor-pointer justify-between rounded-md flex items-center"
              defaultValue={""}
            >
              <option disabled value={""}>
                Tujuan Donasi
              </option>
              {campaignData?.data?.map((data) => (
                <option key={data?._id} value={data?.title}>
                  {data.title}
                </option>
              ))}
            </select>
            <label
              htmlFor="bukti-transfer"
              className="input text-xs sm:text-sm  bg-[#f2f2f2] cursor-pointer justify-between rounded-md flex items-center"
            >
              {watch("bukti_transfer") && (
                <span
                  className={`text-green-600 ${
                    watch("bukti_transfer")?.length === 0 && "hidden"
                  } animate-pulse`}
                >
                  {watch("bukti_transfer")[0]?.name}
                </span>
              )}
              {/* {!watch("bukti_transfer") && (
                <span className=" text-[#a7acb3]">Upload Bukti Transfer</span>
              )} */}
              {watch("bukti_transfer") == null ? (
                <span className=" text-[#a7acb3]">Upload Bukti Transfer</span>
              ) : (
                watch("bukti_transfer").length == 0 && (
                  <span className=" text-[#a7acb3] text-start">
                    Upload Bukti Transfer
                  </span>
                )
              )}

              {/* {watch("bukti_transfer") ? (
                <span className="text-black">
                  {watch("bukti_transfer")[0]?.name}
                </span>
              ) : (
                ""
              )} */}
              <BsFillImageFill size={25} className="text-black " />
            </label>

            <input
              type="file"
              id="bukti-transfer"
              name="bukti-transfer"
              className="hidden"
              {...register("bukti_transfer")}
            />
            <span className="font-semibold text-sm sm:text-base">
              Tulis Ucapan Pesan atau Do’a
            </span>
            <textarea
              type="text"
              className="input bg-[#f2f2f2] h-52 rounded-md py-5"
              placeholder="Ketik Disini"
              name="ucapan"
              {...register("pesan")}
            ></textarea>
            <div className="w-full  rounded-lg h-14 lg:h-16 text-white flex  bottom-3 bg-black  ">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full text-sm sm:text-base h-full text-white flex items-center justify-center font-bold"
              >
                {isLoading ? "Loading..." : "Salurkan Dana Sekarang"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormKonfirmasi;
