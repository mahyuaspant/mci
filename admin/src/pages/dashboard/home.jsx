import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Select,
  Option,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { projectsTableData, ordersOverviewData } from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { BiDonateHeart, BiNews, BiSolidDonateHeart } from "react-icons/bi";
import { MdCampaign } from "react-icons/md";
import {
  useGetAllBerita,
  useGetAllCampaign,
  useGetAllDonasi,
  useGetAllPublicKategori,
  useGetAllStatusDonasi,
  useGetDashboard,
} from "@/hooks";
import { useForm } from "react-hook-form";
import { chartsConfig } from "@/configs";

function generateYears(startYear, endYear) {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
}

export function Home() {
  const { register, watch } = useForm();
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState();
  const [categorie, setCategorie] = useState("");
  const startYear = 2023;

  const yearsList = generateYears(startYear, currentYear);
  const { data: statusData } = useGetAllStatusDonasi({
    currentPage: 1,
    searchTerm: "",
  });
  const { data: campaignData } = useGetAllCampaign({
    currentPage: 1,
    searchTerm: "",
  });
  const { data: donasiData } = useGetAllDonasi({
    searchTerm: "",
    currentPage: 1,
  });
  const { data: beritaData } = useGetAllBerita({
    searchTerm: "",
    currentPage: 1,
  });
  const {
    data: dataDashboard,
    isLoading: dashboardIsLoad,
    isFetching: dashboardIsFetch,
  } = useGetDashboard({
    year: year,
    categorie: categorie,
  });
  const { data: dataCategorie } = useGetAllPublicKategori();
  const statisticsCardsData = [
    {
      color: "gray",
      path: "/dashboard/donasi",
      icon: BiDonateHeart,
      title: "Donasi Masuk",
      value: donasiData?.total,
    },
    {
      color: "gray",
      path: "/dashboard/status",
      icon: BiSolidDonateHeart,
      title: "Donasi Diterima",
      value: statusData?.data?.filter((item) => item.approval == true)?.length,
    },
    {
      color: "gray",
      path: "/dashboard/campaign",
      icon: MdCampaign,
      title: "Campaign",
      value: campaignData?.total,
    },
    {
      color: "gray",
      path: "/dashboard/berita",
      icon: BiNews,
      title: "Berita",
      value: beritaData?.total,
    },
  ];

  const completedTasksChart = {
    type: "bar",
    height: 220,
    options: {
      ...chartsConfig,
      colors: ["#388e3c"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "Total donasi",
        data: [
          dataDashboard && dataDashboard[0]?.total,
          dataDashboard && dataDashboard[1]?.total,
          dataDashboard && dataDashboard[2]?.total,
          dataDashboard && dataDashboard[3]?.total,
          dataDashboard && dataDashboard[4]?.total,
          dataDashboard && dataDashboard[5]?.total,
          dataDashboard && dataDashboard[6]?.total,
          dataDashboard && dataDashboard[7]?.total,
          dataDashboard && dataDashboard[8]?.total,
          dataDashboard && dataDashboard[9]?.total,
          dataDashboard && dataDashboard[10]?.total,
          dataDashboard && dataDashboard[11]?.total,
        ],
      },
    ],
  };

  const statisticsChartsData = [
    {
      color: "white",
      title: "Total Donasi",
      description: "Hasil Donasi Yang Sudah Diterima",
      chart: completedTasksChart,
    },
  ];

  useEffect(() => {
    setYear(currentYear);
  }, []);
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
          />
        ))}
      </div>
      <div className="w-full flex flex-col items-end">
        <div className="w-full h-full my-5 flex flex-col sm:flex-row max-w-xl gap-5">
          <Select
            size="lg"
            label="Tahun"
            className="text-black py-5 "
            defaultValue={`${year}`}
            value={`${year}`}
            onChange={(e) => {
              setYear(e);
            }}
          >
            {yearsList?.map((item, index) => {
              return (
                <Option key={index} value={`${item}`}>
                  {item}
                </Option>
              );
            })}
          </Select>

          {dataCategorie && (
            <Select
              size="lg"
              label="Kategori"
              className="text-black py-5"
              onChange={(e) => {
                setCategorie(e);
              }}
            >
              {dataCategorie?.data?.map((item, index) => {
                return (
                  <Option key={index} value={item?.name}>
                    {item?.name}
                  </Option>
                );
              })}
            </Select>
          )}
        </div>
      </div>
      <div className="mb-6 w-full h-[55vh]">
        {dashboardIsLoad ? (
          <div class=" flex justify-center flex-col gap-5 items-center py-20">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            Loading...
          </div>
        ) : (
          statisticsChartsData.map((props) => (
            <StatisticsChart
              key={props.title}
              {...props}
              footer={
                <Typography
                  variant="small"
                  className="flex items-center font-normal text-blue-gray-600"
                >
                  <ClockIcon
                    strokeWidth={2}
                    className="h-4 w-4 text-blue-gray-400"
                  />
                  &nbsp;{props.footer}
                </Typography>
              }
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
