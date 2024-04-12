import { Fragment } from "react";
import responseData from "../assets/responseData";
import { useRecoilState } from "recoil";
import { conversationState } from "../store/atoms";

// Generate the suggested prompts and response dynamically from the mock response data
const suggestedPrompts = [];
for (let i = 0; i < 4; i++) {
  const randomIndex = Math.floor(Math.random() * responseData.length);
  const element = { ...responseData[randomIndex] };
  suggestedPrompts.push({ ...element, id: i });
}

// SuggestedPromptCard Component to render the initially suggested prompts dynamically
const SuggestedPromptCard = ({ suggestedPrompt }) => {
  const [conversation, setConversation] = useRecoilState(conversationState);

  /**
   * Starts a new conversation with a suggested prompt.
   * Creates a new chat object with the suggested prompt and current date,
   * then sets it as the initial conversation.
   */
  const startConversation = () => {
    const date = new Date();
    const newChat = { ...suggestedPrompt, date };

    const newConversation = [newChat];

    setConversation(newConversation);
  };

  return (
    <div
      className={` dark:bg-slate-600 w-full max-h-40 overflow-hidden bg-white rounded-[5px] flex flex-col justify-start items-start md:px-5 px-3 py-3 gap-3 ${
        suggestedPrompt.id > 2 && "hidden md:flex"
      } cursor-pointer`}
      style={{
        filter: "drop-shadow(0 4px 4px #00000040)",
      }}
      onClick={startConversation}
    >
      {/* SUGGESTED PROMPT */}
      <h3 className=" dark:text-slate-100 text-base font-bold md:text-xl">
        {suggestedPrompt.question}
      </h3>

      {/* RESPONSE FOR THE PROMPT RENDERED DYNAMICALLY */}
      <p className=" dark:text-slate-400 text-[#00000080] text-sm md:text-base">
        {suggestedPrompt.response}
      </p>
    </div>
  );
};

const InitialPage = () => {
  return (
    <div className=" dark:bg-slate-500 w-full h-full overflow-auto md:flex-grow md:justify-end p-4 flex flex-col justify-start items-center gap-20">
      {/* INITIAL GREETINGS & LOGO */}
      <div className="flex flex-col justify-center items-center gap-2 mb-0">
        {/* INITIAL GREETINGS */}
        <h2 className=" dark:text-white text-lg md:text-3xl font-medium text-center">
          How Can I Help You Today?
        </h2>

        {/* INTRODUCTORY LOGO */}
        <img
          className="size-16 dark:drop-shadow-xl"
          style={{ filter: "drop-shadow(#000000/15 -4px 4px 10px)" }}
          src="/logo.png"
        />
      </div>

      {/* RENDER THE SUGGESTED PROMPTS & RESPONSE USING CARDS */}
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
