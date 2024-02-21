import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchInput = ({ onChange }) => {
  return (
    <div className="input flex gap-4 items-center w-full bg-[#f2f2f2]">
      <input
        onChange={onChange}
        type="text"
        placeholder="Pencarian"
        className="bg-transparent w-full"
      />
      <CiSearch size={35} className="text-green-400" />
    </div>
  );
};

export default SearchInput;
