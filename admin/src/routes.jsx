import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import {
  BiCategory,
  BiDonateHeart,
  BiSolidDonateHeart,
  BiNews,
  BiImages,
} from "react-icons/bi";
import { MdCampaign } from "react-icons/md";
import {
  Home,
  Profile,
  Kategori,
  Campaign,
  Donasi,
  Status,
  Berita,
  Carousel,
} from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        hidden: false,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
        hidden: false,
      },

      {
        icon: <BiCategory {...icon} />,
        name: "kategori",
        path: "/kategori",
        element: <Kategori />,
        hidden: false,
      },
      {
        icon: <MdCampaign {...icon} />,
        name: "campaign",
        path: "/campaign",
        element: <Campaign />,
        hidden: false,
      },
      {
        icon: <BiDonateHeart {...icon} />,
        name: "donasi",
        path: "/donasi",
        element: <Donasi />,
        hidden: false,
      },
      {
        icon: <BiSolidDonateHeart rcleIcon {...icon} />,
        name: "status donasi",
        path: "/status",
        element: <Status />,
        hidden: false,
      },
      {
        icon: <BiNews {...icon} />,
        name: "berita",
        path: "/berita",
        element: <Berita />,
        hidden: false,
      },
      {
        icon: <BiImages {...icon} />,
        name: "gambar slide",
        path: "/carousel",
        element: <Carousel />,
        hidden: false,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
