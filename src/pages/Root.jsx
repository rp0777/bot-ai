import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className=" dark:bg-slate-400 w-screen h-screen flex flex-col md:flex-row justify-start items-center">
      <Navbar />

      <div className=" dark:bg-slate-500 w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#D7C7F433] to-[#9785BA33]">
        <h1 className=" w-full text-3xl text-[#9785BA] dark:text-white hidden md:pl-4 md:h-11 md:flex md:justify-start md:items-center">
          Bot AI
        </h1>

        <Outlet />
      </div>
    </div>
  );
};

export default Root;
