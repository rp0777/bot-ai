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

  const handleSubmit = () => {
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
      question: inputQuestion,
      response: answer,
    };

    const updatedConversations = [newConversation, ...conversation];

    setConversation(updatedConversations);
    setInputQuestion("");
    inputRef.current.focus();
  };

  const handleSave = () => {
    const updatedPastConversations = [...pastConversations, conversation];
    setPastConversations(updatedPastConversations);
    setConversation([]);
  };

  return (
    <div className=" w-full h-10 mb-4 flex justify-between items-center gap-3 px-4">
      <input
        ref={inputRef}
        className=" w-full h-full rounded-[5px] border-[1px] border-[#00000073] outline-none px-4"
        type="text"
        value={inputQuestion}
        onChange={handleInputChange}
      />

      <button
        className="h-full text-base flex justify-center items-center p-3 bg-[#D7C7F4] rounded-[5px] outline-none"
        onClick={handleSubmit}
      >
        Ask
      </button>

      <button
        className="h-full text-base flex justify-center items-center p-3 bg-[#D7C7F4] rounded-[5px] outline-none"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default PromptBar;
