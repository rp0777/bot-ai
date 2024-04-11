import { Fragment } from "react";
import responseData from "../assets/responseData";
import { useRecoilState } from "recoil";
import { conversationState } from "../store/atoms";

const suggestedPrompts = [];
for (let i = 0; i < 4; i++) {
  const randomIndex = Math.floor(Math.random() * responseData.length);
  const element = { ...responseData[randomIndex] };
  suggestedPrompts.push({ ...element, id: i });
}

const SuggestedPromptCard = ({ suggestedPrompt }) => {
  const [conversation, setConversation] = useRecoilState(conversationState);

  const startConversation = () => {
    const date = new Date();
    const newChat = { ...suggestedPrompt, date };

    const newConversation = [newChat];

    setConversation(newConversation);
  };

  return (
    <div
      className={`w-full max-h-40 overflow-hidden bg-white rounded-[5px] flex flex-col justify-start items-start md:px-5 px-3 py-3 gap-3 ${
        suggestedPrompt.id > 2 && "hidden md:flex"
      } cursor-pointer`}
      style={{
        filter: "drop-shadow(0 4px 4px #00000040)",
      }}
      onClick={startConversation}
    >
      <h3 className=" text-base font-bold md:text-xl">
        {suggestedPrompt.question}
      </h3>
      <p className="text-[#00000080] text-sm md:text-base">
        {suggestedPrompt.response}
      </p>
    </div>
  );
};

const InitialPage = () => {
  return (
    <div className=" w-full h-full overflow-auto md:flex-grow md:justify-end p-4 flex flex-col justify-start items-center gap-20">
      <div className="flex flex-col justify-center items-center gap-2 mb-0">
        <h2 className=" text-lg font-medium text-center">
          How Can I Help You Today?
        </h2>
        <img
          className="size-16"
          style={{ filter: "drop-shadow(#000000/15 -4px 4px 10px)" }}
          src="/logo.png"
        />
      </div>

      <div className="w-[90%] md:w-full grid md:grid-cols-2 grid-cols-1 gap-3">
        {suggestedPrompts.map((suggestedPrompt) => (
          <Fragment key={suggestedPrompt.id}>
            <SuggestedPromptCard suggestedPrompt={suggestedPrompt} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default InitialPage;
