import { Fragment, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { conversationState, pastConversationsState } from "../store/atoms";

const Navbar = () => {
  const [togglerNav, setTogglerNav] = useState(false);
  const [pastConversations, setPastConversations] = useRecoilState(
    pastConversationsState
  );
  const [conversation, setConversation] = useRecoilState(conversationState);

  const clickHandler = () => {
    setTogglerNav(!togglerNav);
  };

  const handleNewChat = () => {
    // const updatedPastConversations = [conversation, ...pastConversations];
    setPastConversations([]);
    setConversation([]);
  };

  return (
    <Fragment>
      {/* Mobile Design */}
      <div className=" w-full h-[60px] p-3 flex justify-start items-center gap-4 md:hidden">
        <button
          className="text-[#9785BA] rounded-lg hover:bg-purple-200 p-2"
          onClick={clickHandler}
        >
          <FaBars />
        </button>

        <h1 className="text-3xl text-[#9785BA]">Bot AI</h1>
      </div>

      {/* When sideBar is Open */}
      {togglerNav && (
        <div
          className={
            "absolute top-1 left-1 flex flex-col justify-start items-center gap-4 bg-slate-100 rounded-lg w-52 h-[100vh] z-10"
          }
        >
          <div className=" w-full flex justify-evenly items-center gap-4 ml-4 mt-3 ">
            <h1 className="text-3xl text-[#9785BA]">Bot AI</h1>

            <button
              className="text-[#9785BA] rounded-lg hover:bg-purple-200 p-2 text-2xl"
              onClick={clickHandler}
            >
              <IoMdClose />
            </button>
          </div>

          <Link
            className="flex justify-start bg-purple-200 p-2 rounded-lg w-[90%] font-bold text-[#414146]"
            to="/"
            onClick={clickHandler}
          >
            New Chat
          </Link>

          <Link
            className="flex justify-start bg-purple-200 p-2 rounded-lg w-[90%] font-bold text-[#414146]"
            to="/conversations"
            onClick={clickHandler}
          >
            Past Conversations
          </Link>
        </div>
      )}

      {/* Desktop Design */}
      <div className="hidden md:w-[250px] md:h-full md:bg-slate-100 md:flex md:flex-col justify-start items-start">
        <div className=" w-full h-12 bg-[#D7C7F4] flex justify-evenly items-center">
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

          <button onClick={handleNewChat}>
            <FaRegPenToSquare className=" cursor-pointer" />
          </button>
        </div>

        <div className="w-full h-full bg-white flex flex-col justify-start items-center px-4 py-3">
          <Link className="w-full" to="/conversations">
            <p className="h-[40px] bg-[#D7C7F4] text-[#414146] font-bold flex justify-center items-center rounded-[10px]">
              Past Conversations
            </p>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
