import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import {
  BiCategory,
  BiDonateHeart,
  BiSolidDonateHeart,
  BiNews,
} from "react-icons/bi";
import { MdCampaign } from "react-icons/md";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BiDonateHeart,
    title: "Donasi Masuk",
    value: `0`,
  },
  {
    color: "gray",
    icon: BiSolidDonateHeart,
    title: "Donasi Diterima",
    value: "5",
  },
  {
    color: "gray",
    icon: MdCampaign,
    title: "Campaign",
    value: "2",
  },
  {
    color: "gray",
    icon: BiNews,
    title: "Berita",
    value: "1",
  },
];
