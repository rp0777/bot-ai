import { Fragment } from "react";

const suggestedPrompts = [
  {
    id: 0,
    prompt: "Hi, what is the weather",
    response: "Get immediate AI generated response",
  },
  {
    id: 1,
    prompt: "Hi, what is my location",
    response: "Get immediate AI generated response",
  },
  {
    id: 2,
    prompt: "Hi, what is the temperature",
    response: "Get immediate AI generated response",
  },
  {
    id: 3,
    prompt: "Hi, how are you",
    response: "Get immediate AI generated response",
  },
];

const SuggestedPromptCard = ({ suggestedPrompt }) => (
  <div
    className={`w-full h-[111px] bg-white rounded-[5px] flex flex-col justify-center items-start px-3 gap-3 ${
      suggestedPrompt.id > 2 && `hidden md:flex`
    } cursor-pointer`}
    style={{
      filter: "drop-shadow(0 4px 4px #00000040)",
    }}
  >
    <h3 className=" text-xl font-bold">{suggestedPrompt.prompt}</h3>
    <p className="text-[#00000080]">{suggestedPrompt.response}</p>
  </div>
);

const InitialPage = () => {
  return (
    <div className="flex-grow w-full p-4 flex flex-col justify-end items-center gap-20">
      <div className="flex flex-col justify-center items-center gap-3 mb-0">
        <h2 className="text-[28px] font-medium text-center">
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
