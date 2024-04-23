import { Fragment, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { conversationState, pastConversationsState } from "../store/atoms";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";

const Navbar = () => {
  const [togglerNav, setTogglerNav] = useState(false);
  const [pastConversations, setPastConversations] = useRecoilState(
    pastConversationsState
  );
  const [conversation, setConversation] = useRecoilState(conversationState);
  const [theme, setTheme] = useState("null");

  const navigate = useNavigate();

  const clickHandler = () => {
    setTogglerNav(!togglerNav);
  };

  /**
   * Handles setting the theme based on the user's preferred color scheme.
   * If the user prefers dark mode, sets the theme to "dark"; otherwise, sets it to "light".
   */
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

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

  /**
   * Handles switching themes.
   */
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  /**
   * Handles creating a new chat session.
   * If there is an ongoing conversation, it moves it to past conversations
   * and stores them in local storage. Then clears the current conversation.
   */
  const handleNewChat = () => {
    if (conversation.length > 0) {
      const updatedPastConversations = [conversation, ...pastConversations];

      if (updatedPastConversations.length > 0) {
        // Store the past conversations to local Storage
        localStorage.setItem(
          "pastConversations",
          JSON.stringify(updatedPastConversations)
        );

        setPastConversations(updatedPastConversations);
      }
    }

    setConversation([]);
  };

  /**
   * Clears all past conversations and the current conversation.
   * Removes past conversations from local storage.
   * Navigates the user to the home page ("/").
   */
  const handleClearAll = () => {
    setPastConversations([]);

    setConversation([]);

    localStorage.removeItem("pastConversations");

    navigate("/");
  };

  return (
    <Fragment>
      {/* MOBILE VERSION */}
      <div className=" w-full h-[60px] p-3 flex justify-between items-center gap-4 md:hidden">
        <div className=" flex justify-center items-center gap-4">
          {/* HAMBURGER MENU BUTTON */}
          <button
            className=" dark:text-slate-700 text-[#9785BA] rounded-lg hover:bg-purple-200 p-2"
            onClick={clickHandler}
          >
            <FaBars />
          </button>

          {/* MAIN LOGO */}
          <h1 className=" dark:text-slate-700 text-3xl text-[#9785BA]">
            Bot AI
          </h1>
        </div>

        {/* DARK MODE TOGGLE BUTTON */}
        <button className=" mr-2" onClick={handleThemeSwitch}>
          {theme === "light" || theme === null ? (
            <BsSun size={24} />
          ) : (
            <MdOutlineDarkMode size={24} />
          )}
        </button>
      </div>

      {/* WHEN SIDEBAR IS OPEN IN MOBILE */}
      {togglerNav && (
        <div
          className={
            " dark:bg-slate-800 absolute top-1 left-1 flex flex-col justify-start items-center gap-4 bg-slate-100 rounded-lg w-52 h-[100vh] z-10"
          }
        >
          {/* LOGO AND CLOSE BUTTON */}
          <div className=" w-full flex justify-evenly items-center gap-4 ml-4 mt-3 ">
            <h1 className="text-3xl text-[#9785BA]">Bot AI</h1>

            <button
              className=" dark:bg-slate-400 dark:text-slate-700 text-[#9785BA] rounded-lg p-2 text-2xl"
              onClick={clickHandler}
            >
              <IoMdClose />
            </button>
          </div>

          {/* NEW CHAT BUTTON */}
          <Link
            className=" dark:bg-slate-400 dark:text-slate-700 flex justify-start bg-purple-200 p-2 rounded-lg w-[90%] font-bold text-[#414146]"
            to="/"
            onClick={() => {
              handleNewChat();

              setTogglerNav(!togglerNav);
            }}
          >
            New Chat
          </Link>

          {/* PAST CONVERSATION BUTTON */}
          <Link
            className=" dark:bg-slate-400 dark:text-slate-700 flex justify-start bg-purple-200 p-2 rounded-lg w-[90%] font-bold text-[#414146]"
            to="/conversations"
            onClick={clickHandler}
          >
            Past Conversations
          </Link>

          {/* CLEAR ALL BUTTON */}
          <button
            className="w-[90%] h-[40px] bg-red-400 text-start p-2  text-[#ffffff] font-bold rounded-[10px]"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        </div>
      )}

      {/* DESKTOP DESIGN */}
      <div className=" hidden md:w-[250px] md:h-full md:bg-slate-100 md:flex md:flex-col justify-start items-start">
        {/* LOGO, NEW CHAT HEADING AND ICON */}
        <div className=" dark:bg-slate-700 dark:text-white w-full h-12 bg-[#D7C7F4] flex justify-evenly items-center">
          <Link to="/">
            <img
              className=" size-8"
              style={{ filter: "drop-shadow(#000000/25 0 4px 4px)" }}
              src="/logo.png"
            />
          </Link>

          <Link to="/">
            <p className=" text-xl ">New Chat</p>
          </Link>

          <Link to="/" onClick={handleNewChat}>
            <FaRegPenToSquare className=" cursor-pointer" />
          </Link>
        </div>

        {/* PAST CONVERSATION AND CLEAR BUTTONS */}
        <div className=" dark:bg-slate-600 w-full h-full bg-white flex flex-col justify-start items-center gap-5 px-4 py-3">
          {/* PAST CONVERSATION BUTTON */}
          <Link className="w-full" to="/conversations">
            <p className="h-[40px] bg-[#D7C7F4] text-[#414146] font-bold flex justify-center items-center rounded-[10px]">
              Past Conversations
            </p>
          </Link>

          {/* CLEAR ALL BUTTON */}
          <button
            className="w-full h-[40px] bg-red-400  text-[#ffffff] font-bold rounded-[10px]"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
