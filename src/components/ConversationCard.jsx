import { useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { conversationState } from "../store/atoms";
import { useRecoilState } from "recoil";

const labels = {
  1: "Very Poor",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const dateFormat = (dateStr) => {
  const date = new Date(dateStr.split("T")[0]);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${months[month]} ${day}, ${year}`;
};

const ConversationCard = ({ chat, isResponse, isReadOnly }) => {
  const [conversation, setConversation] = useRecoilState(conversationState);
  const [liked, setLiked] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [inputFeedback, setInputFeedback] = useState("");

  const handleInputChange = (e) => {
    setInputFeedback(e.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  useEffect(() => {
    const updateConversation = () => {
      const updatedChat = { ...chat, rating };

      const updatedConversation = conversation.map((chat) => {
        if (chat.id === updatedChat.id) {
          return updatedChat;
        }

        return chat;
      });

      setConversation(updatedConversation);
    };

    updateConversation();
  }, [rating]);

  /**
   * Handles Feedback Form Submission
   *
   * This function handles the submission of a form, specifically related to chat feedback. It updates the feedback of the chat with the input feedback provided.
   * It clones the chat object and updates its feedback property with the inputFeedback.
   * Then it iterates through the conversation array, and if it finds a chat with the same ID as the updated chat, it replaces it with the updated chat.
   * After updating the conversation state with the modified conversation array, it closes the modal.
   */
  const handleSubmit = () => {
    const updatedChat = { ...chat, feedback: inputFeedback };

    const updatedConversation = conversation.map((chat) => {
      if (chat.id === updatedChat.id) {
        return updatedChat;
      }

      return chat;
    });

    setConversation(updatedConversation);

    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLiked = () => setLiked(!liked);

  const istTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  const hoursIST = new Date(istTime).getHours();
  const minutesIST = new Date(istTime).getMinutes();
  const amOrPmIST = hoursIST >= 12 ? "PM" : "AM";
  const formattedTimeIST = `${hoursIST % 12}:${
    minutesIST < 10 ? `0${minutesIST}` : minutesIST
  } ${amOrPmIST}`;

  return (
    <div
      className={`${
        isReadOnly && "bg-[#b2a3cc]"
      } w-[95%] px-4 py-3 bg-[#D7C7F421] flex justify-between items-start gap-5 rounded-[20px]`}
      style={{ boxShadow: "-4px 4px 15px rgba(0, 0, 0, 0.15)" }}
    >
      {/* Uer or Bot Avatar */}
      <img
        className=" size-16"
        src={isResponse ? "/logo.png" : "/user.png"}
        alt="user avatar"
      />

      {/* Main Text Container */}
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <h3 className=" font-bold">{isResponse ? "Bot AI" : "You"}</h3>

        {/* User Prompt or Bot Response */}
        <p>{isResponse ? chat.response : chat.question}</p>

        <div className=" w-full flex justify-between items-center text-xs font-medium text-[#0706069e]">
          {/* Time and Date */}
          <p>
            {isReadOnly
              ? `${dateFormat(chat.date)}, ${formattedTimeIST}`
              : formattedTimeIST}
          </p>

          {/* Like and Dislike Buttons */}
          <div
            className={`${
              (!isResponse || isReadOnly) && "hidden"
            } flex justify-center items-center gap-4 pr-4 md:opacity-0 md:hover:opacity-100`}
          >
            <button onClick={handleLiked}>
              <AiOutlineLike size={"20px"} className="cursor-pointer" />
            </button>

            <button onClick={() => setIsOpen(true)}>
              <AiOutlineDislike size={"20px"} className="cursor-pointer" />
            </button>
          </div>
        </div>

        {/* Star Rating */}
        {(liked || (isResponse && isReadOnly && chat.rating !== 0)) && (
          <div className="flex flex-col justify-center items-start">
            {!isReadOnly && <p>Provide the Ratings!</p>}

            <div className=" flex">
              <Rating
                name="hover-feedback"
                value={isReadOnly ? chat.rating : rating}
                precision={1}
                getLabelText={getLabelText}
                onChange={handleRatingChange}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
                readOnly={isReadOnly && "readOnly"}
              />
              {rating !== null && (
                <Box sx={{ ml: 2 }}>
                  {labels[hover !== -1 ? hover : rating]}
                </Box>
              )}

              {isReadOnly && (
                <p>
                  {labels[chat.rating]} ({chat.rating})
                </p>
              )}
            </div>
          </div>
        )}

        {/* User Feedback Form */}
        <Modal
          isOpen={isOpen}
          contentLabel={"Provide Additional Feedback"}
          className="w-[350px] h-[340px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 bg-opacity-85 rounded-lg p-30 flex flex-col justify-center items-center gap-6"
        >
          <div className=" w-full px-4 flex justify-between items-center">
            <div className=" flex justify-center items-center gap-4">
              <img className="" src="/bulb.png" alt="Bulb Image" />

              <p className=" font-semibold">Provide Additional Feedback</p>
            </div>

            <button
              className=" font-medium p-2 bg-[#D7C7F4] rounded-md"
              onClick={closeModal}
            >
              <IoMdClose />
            </button>
          </div>

          <textarea
            className="w-[300px] h-[150px] p-4 overflow-auto"
            value={inputFeedback}
            onChange={handleInputChange}
          />

          <button
            className=" w-40 h-12 rounded-[10px] bg-[#D7C7F4] font-medium"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Modal>

        {/* User Feedback rendered on Card */}
        {(inputFeedback || (isResponse && isReadOnly && chat.feedback)) && (
          <p>
            <span className=" font-semibold"> Feedback : &nbsp; </span>
            {isReadOnly ? chat.feedback : inputFeedback}
          </p>
        )}
      </div>
    </div>
  );
};

export default ConversationCard;
