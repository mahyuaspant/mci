"use client";
import { GoHomeFill } from "react-icons/go";
import { FaCompass } from "react-icons/fa";
import { BiSolidNotepad } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="h-20 w-full px-4 sm:px-20 flex items-center justify-between bg-white border-t max-w-2xl fixed bottom-0 z-10">
      <div className="w-full h-full flex justify-between items-center">
        <Link
          href={"/"}
          className="flex  items-center gap-1 justify-center flex-col h-full"
        >
          <GoHomeFill
            size={25}
            className={`${
              pathname === "/" ? "text-yellow-400" : "text-gray-500"
            }`}
          />
          <span className="text-xs sm:text-sm">Beranda</span>
        </Link>
        <Link
          href={"/eksplorasi"}
          className="flex  items-center gap-1 justify-center flex-col h-full"
        >
          <FaCompass
            size={25}
            className={`${
              pathname === "/eksplorasi" ? "text-yellow-400" : "text-gray-500"
            }`}
          />
          <span className="text-xs sm:text-sm">Eksplorasi</span>
        </Link>
        <Link
          href={"/cabang_organisasi"}
          className="flex  items-center gap-1 justify-center flex-col h-full"
        >
          <BiSolidNotepad
            size={25}
            className={`${
              pathname === "/cabang_organisasi"
                ? "text-yellow-400"
                : "text-gray-500"
            }`}
          />
          <span className="text-xs sm:text-sm">Cabang MCI</span>
        </Link>
        <Link
          href={"/profil"}
          className="flex  items-center gap-1 justify-center flex-col h-full"
        >
          <BsFillPersonFill
            size={25}
            className={`${
              pathname === "/profil" ? "text-yellow-400" : "text-gray-500"
            }`}
          />
          <span className="text-xs sm:text-sm">Profil</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
