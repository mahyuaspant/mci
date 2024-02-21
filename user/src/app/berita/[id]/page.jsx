import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { getOneBerita } from "@/services";
import { dateFormat } from "@/utils/helper";

export const generateMetadata = async ({ params }) => {
  const dataBerita = await getOneBerita(params.id);

  return {
    title: dataBerita?.data?.title,
    description: `Berita tentang ${dataBerita?.data?.title}`,
  };
};

const DetailBerita = async ({ params }) => {
  const oneBerita = await getOneBerita(params.id);
  return (
    <div className="bg-slate-100 min-h-screen w-full">
      <div className="flex min-h-screen flex-col mx-auto w-full gap-5 p-5 max-w-2xl bg-white ">
        <div className="w-full flex items-center ">
          <Link href={"/"} className="w-full  flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <FaChevronLeft className="text-white group-hover:text-yellow-400 transition-all duration-500" />
            </div>
            <span>Kembali</span>
          </Link>
        </div>
        <article className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <div className="w-full h-64">
              <Image
                src={oneBerita?.data?.image?.url}
                loading="eager"
                alt={oneBerita?.data?.image?.url}
                priority={true}
                width={0}
                height={0}
                sizes="100vw"
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="font-bold text-lg">{oneBerita?.data?.title}</h1>
            <small>
              Diposting pada {dateFormat(oneBerita?.data?.createdAt)}
            </small>
          </div>
          <div className="w-full h-full border py-8 px-6 rounded-lg">
            <div
              className="prose lg:prose-xl break-all"
              dangerouslySetInnerHTML={{
                __html: oneBerita?.data?.content,
              }}
            ></div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default DetailBerita;
