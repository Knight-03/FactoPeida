import React from "react";
import { PiNotePencilDuotone } from "react-icons/pi";
import TextAnimation from "./TextAnimation";

const Navbar = ({ openAddFact, setOpenAddFact }) => {
  const handleOpenAddFact = () => {
    setOpenAddFact(!openAddFact);
  };
  return (
    <div className="container text-white flex flex-row gap-8 h-fit items-center">
      <div className="w-full flex justify-start  ">
        <TextAnimation />
      </div>

      <div
        className="w-full flex justify-end px-4 text-white hover:text-slate-400 gap-2 cursor-pointer"
        onClick={handleOpenAddFact}
      >
        <PiNotePencilDuotone size={25} />
        <p className="flex flex-row items-center text-lg gap-2 max-sm:text-xl">
          Write
        </p>
      </div>
    </div>
  );
};
export default Navbar;
