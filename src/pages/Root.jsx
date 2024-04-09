import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row justify-center items-center">
      <Navbar />

      <Outlet />
    </div>
  );
};

export default Root;
