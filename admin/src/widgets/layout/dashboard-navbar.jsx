import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import routes from "@/routes";
import { useAuth } from "@/store";
import { formatTimeAgo, successNotify } from "@/utils/helper";
import { useGetAllDonasi } from "@/hooks";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

export function DashboardNavbar() {
  const { data: donasiData } = useGetAllDonasi({
    searchTerm: "",
    currentPage: 1,
    limit: 999,
  });
  const { setLogout } = useAuth();
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const breadcrumbs = pathname.split("/")
  const breadCrumbs = pathname.split("/").filter((el) => el !== "");
  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl w-full transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            {breadCrumbs.map((item, index) => {
              const path = `/${breadCrumbs.slice(0, index + 1).join("/")}`;

              return (
                <Link
                  to={`${path == "/dashboard" ? "/dashboard/home" : path}`}
                  key={index}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                  >
                    {item}
                  </Typography>
                </Link>
              );
            })}
          </Breadcrumbs>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56"></div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <div>
            <Button
              onClick={() => {
                setLogout();
                successNotify("Berhasil Logout!");
              }}
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex normal-case"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              Logout
            </Button>
            <IconButton
              onClick={() => {
                setLogout();
                successNotify("Berhasil Logout!");
              }}
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500 " />
            </IconButton>
          </div>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray" className="relative">
                {donasiData?.data?.length > 0 && (
                  <div className="w-2 h-2 bg-red-600 rounded-full absolute right-0"></div>
                )}
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              {donasiData?.data?.map((item) => {
                return (
                  <MenuItem
                    key={item._id}
                    className="flex items-center gap-3"
                    onClick={() => {
                      navigate("/dashboard/donasi");
                    }}
                  >
                    <Avatar
                      src={item.donation_proof.url}
                      alt="item-1"
                      size="sm"
                      variant="circular"
                    />
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-1 font-normal"
                      >
                        Donasi baru dari <strong>{item.name}</strong>
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                      >
                        <ClockIcon className="h-3.5 w-3.5" />{" "}
                        {formatTimeAgo(new Date(item.createdAt))}
                      </Typography>
                    </div>
                  </MenuItem>
                );
              })}
              {donasiData?.data?.length === 0 && (
                <span className="text-xs text-center font-bold uppercase">
                  Tidak ada donasi terbaru
                </span>
              )}
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
