import { BsSun } from "react-icons/bs";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";

const Root = () => {
  const [theme, setTheme] = useState("null");

  /**
   * Updates the document's root element to reflect the current theme.
   * If the theme is set to "dark", adds the "dark" class to the document's root element;
   * otherwise, removes the "dark" class.
   * Dependencies: theme - reflects changes in the theme.
   */
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className=" dark:bg-slate-400 w-screen h-screen flex flex-col md:flex-row justify-start items-center">
      <Navbar />

      <div className=" dark:bg-slate-500 w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#D7C7F433] to-[#9785BA33]">
        <div className=" w-full flex justify-between items-center px-8">
          <h1 className=" w-full text-3xl text-[#9785BA] dark:text-white hidden md:h-11 md:flex md:justify-start md:items-center">
            Bot AI
          </h1>

          <button className=" hidden md:flex" onClick={handleThemeSwitch}>
            {theme === "light" || theme === null ? (
              <BsSun size={24} />
            ) : (
              <MdOutlineDarkMode size={24} />
            )}
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Root;
