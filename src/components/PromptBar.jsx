import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { conversationState, pastConversationsState } from "../store/atoms";
import responseData from "../assets/responseData";

const PromptBar = () => {
  const [pastConversations, setPastConversations] = useRecoilState(
    pastConversationsState
  );
  const [conversation, setConversation] = useRecoilState(conversationState);
  const [inputQuestion, setInputQuestion] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputQuestion(e.target.value);
  };

  /**
   * Handles form submission by validating user input, retrieving an appropriate response,
   * and updating the conversation state with the new interaction.
   */
  const handleSubmit = () => {
    if (!inputQuestion) {
      alert("Please add a prompt to continue!");

      return;
    }

    let answer = responseData.filter(
      (res) => res.question.toLowerCase() === inputQuestion.toLowerCase()
    );

    if (answer.length === 0) {
      answer =
        "As an AI, I can't provide real-time information beyond my last training data, and I'm unable to predict future events. For the most accurate and up-to-date information about this topic, I recommend checking a reliable and current source..";
    } else {
      answer = answer[0].response;
    }

    const newConversation = {
      id: new Date().getTime(),
      date: new Date().toISOString().split("T")[0],
      question: inputQuestion,
      response: answer,
    };

    const updatedConversations = [newConversation, ...conversation];

    setConversation(updatedConversations);
    setInputQuestion("");
    inputRef.current.focus();
  };

  /**
   * Handles saving the current conversation to past conversations and storing them in local storage.
   * Clears the current conversation after saving.
   */
  const handleSave = () => {
    if (conversation.length === 0) {
      alert("Please add a prompt to continue!");

      return;
    } else {
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

  return (
    <div className=" dark:bg-slate-500 w-full h-16 flex justify-between items-center gap-3 px-4 py-4">
      {/* PROMPT INPUT */}
      <input
        ref={inputRef}
        className=" dark:bg-slate-400 dark:border-slate-700 dark:text-slate-800 w-full h-full rounded-[5px] border-[1px] border-[#00000073] outline-none px-4"
        type="text"
        value={inputQuestion}
        onChange={handleInputChange}
      />

      {/* ASK BUTTON */}
      <button
        className=" dark:bg-slate-700 dark:text-white h-full text-base flex justify-center items-center p-3 bg-[#D7C7F4] rounded-[5px] outline-none"
        onClick={handleSubmit}
      >
        Ask
      </button>

      {/* SAVE BUTTON */}
      <button
        className=" dark:bg-slate-700 dark:text-white h-full text-base flex justify-center items-center p-3 bg-[#D7C7F4] rounded-[5px] outline-none"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default PromptBar;
