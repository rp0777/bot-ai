import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <h1 className="">
      <Navbar />

      <Outlet />
    </h1>
  );
};

export default Root;
