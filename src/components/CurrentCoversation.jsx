import { useRecoilValue } from "recoil";
import { conversationState } from "../store/atoms";
import { Fragment } from "react";
import ConversationCard from "./ConversationCard";

const CurrentCoversation = () => {
  const conversation = useRecoilValue(conversationState);

  return (
    <div className=" w-full h-full overflow-auto flex flex-col-reverse justify-start items-center gap-4 p-3">
      {conversation.map((chat) => {
        return (
          <Fragment key={chat.id}>
            <ConversationCard
              chat={chat}
              isResponse={true}
              isReadOnly={false}
            />

            <ConversationCard
              chat={chat}
              isResponse={false}
              isReadOnly={false}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export default CurrentCoversation;
