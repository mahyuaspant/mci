import { getBerita, getCarousel, getProfile } from "@/services";
import { Section, SwiperBeranda, SwiperSection } from "./components";
import { MainLayout } from "@/layouts";
import Image from "next/image";
import Link from "next/link";

export const metadata = async () => {
  const dataProfile = await getProfile();
  return {
    title: dataProfile?.data?.name,
    description: dataProfile?.data?.abous_us,
  };
};

export default async function Home() {
  const dataProfile = await getProfile();
  const dataBerita = await getBerita();
  const carouselData = await getCarousel();

  return (
    <main className="bg-slate-100 min-h-screen w-full">
      <MainLayout>
        <div className="flex flex-col gap-5">
          <Image
            src={dataProfile?.data?.logo?.url}
            alt={dataProfile?.data?.logo?.url}
            width={0}
            height={0}
            sizes="100vw"
            className="w-44 lg:w-52 object-cover h-44 lg:h-52 mx-auto"
          />
          <SwiperBeranda carouselData={carouselData} />
          <Section />
          {/* SECTION 3 */}
          <div className="w-full flex flex-col gap-5">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">Berita dan Info</h2>
              <Link
                href={"/berita"}
                className="text-[#53B872] font-semibold text-lg underline"
              >
                Lihat Semua
              </Link>
            </div>

            <SwiperSection
              isBerita={true}
              slidesDataBerita={dataBerita?.data}
            />
          </div>
        </div>
      </MainLayout>
      <div className="flex flex-col mx-auto w-full gap-5 max-w-2xl bg-white"></div>
    </main>
  );
}
