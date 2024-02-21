import { ProfileInfoCard } from "@/widgets/cards";
import { Link } from "react-router-dom";

const ProfileTab = ({ profileData }) => {
  return (
    <>
      <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2">
        <ProfileInfoCard
          title="Tentang Kami"
          description={profileData?.about_us}
          details={{
            nama: profileData?.name,
            alamat: profileData?.address,
            social: (
              <div className="flex items-center gap-4">
                <Link target="_blank" to={profileData?.facebook}>
                  <i className="fa-brands fa-facebook text-blue-700" />
                </Link>
                <Link target="_blank" to={profileData?.instagram}>
                  <i className="fa-brands fa-instagram text-purple-500" />
                </Link>
              </div>
            ),
          }}
        />
        <ProfileInfoCard
          title="Detail Bank"
          description="Detail bank dibawah ini akan digunakan sebagai tujuan transfer untuk campaign"
          details={{
            "nama bank": profileData?.bank_name,
            "nomor rekening": profileData?.bank_number,
            "atas nama": profileData?.bank_owner,
            logo: (
              <img
                alt={`logo ${profileData?.bank_name}`}
                className="w-16 h-16"
                src={profileData?.bank_logo?.url}
              />
            ),
          }}
        />
      </div>
    </>
  );
};

export default ProfileTab;
