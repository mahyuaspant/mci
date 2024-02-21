import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Tooltip,
} from "@material-tailwind/react";
import { FcHome } from "react-icons/fc";
import { PencilIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  CabangModal,
  CabangTab,
  CabangUpdateModal,
  ProfileModal,
  ProfileTab,
} from "./components";
import React from "react";
import { useGetAllCabang, useGetProfile } from "@/hooks";
import { usePagination } from "@/store";

export function Profile() {
  const { currentPage, searchTerm } = usePagination();
  const { data: profileData } = useGetProfile();
  const {
    data: cabangData,
    isLoading: cabangDataIsLoad,
    isFetching: cabangDataIsFetch,
  } = useGetAllCabang({
    searchTerm,
    currentPage,
  });

  const [openProfile, setOpenProfile] = React.useState(false);
  const [openCabang, setOpenCabang] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile((cur) => !cur);
  const handleOpenCabang = () => setOpenCabang((cur) => !cur);

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden  rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <Tabs
              value="profile"
              className="w-full flex flex-col items-center justify-between"
            >
              <div className="mb-10 flex flex-col lg:flex-row items-center justify-between w-full p-4 gap-6">
                <div className="flex items-center gap-6">
                  <Avatar
                    src={profileData?.logo?.url}
                    alt={profileData?.name}
                    size="xl"
                    variant="rounded"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {profileData?.name}
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      ADMIN
                      <Tooltip content="Edit Profile">
                        <PencilIcon
                          className="h-4 w-4 cursor-pointer inline-block ml-2 mb-1 text-blue-gray-500"
                          onClick={handleOpenProfile}
                        />
                      </Tooltip>
                    </Typography>
                  </div>
                </div>

                <div className="w-52 sm:w-96">
                  <TabsHeader>
                    <Tab value="profile">
                      <UserCircleIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      Profile
                    </Tab>
                    <Tab value="cabang">
                      <FcHome className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                      Cabang
                    </Tab>
                  </TabsHeader>
                </div>
              </div>
              <TabsBody>
                <TabPanel value={"profile"}>
                  <ProfileTab profileData={profileData} />
                </TabPanel>
                <TabPanel value={"cabang"}>
                  <CabangTab
                    data={cabangData}
                    isLoading={cabangDataIsLoad}
                    setOpen={setOpenCabang}
                  />
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        </CardBody>
      </Card>
      <ProfileModal
        profileData={profileData}
        open={openProfile}
        handleOpen={handleOpenProfile}
      />
      <CabangModal handleOpen={handleOpenCabang} open={openCabang} />
    </>
  );
}

export default Profile;
