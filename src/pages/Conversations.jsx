import { useRecoilValue } from "recoil";
import { pastConversationsState } from "../store/atoms";
import { Fragment } from "react";
import ConversationCard from "../components/ConversationCard";

const Conversations = () => {
  const pastConversations = useRecoilValue(pastConversationsState);
  // <div className=" w-full h-full overflow-auto flex flex-col-reverse justify-start items-center gap-4 p-3">

  return (
    <div className=" w-full h-full overflow-auto flex flex-col-reverse justify-start items-center gap-4 p-3 bg-gradient-to-r from-[#D7C7F433] to-[#9785BA33]">
      {pastConversations.map((conversation, index) => (
        <Fragment key={index}>
          {conversation.map((chat) => (
            <Fragment key={chat.id}>
              <ConversationCard
                chat={chat}
                isResponse={true}
                isReadOnly={true}
              />

              <ConversationCard
                chat={chat}
                isResponse={false}
                isReadOnly={true}
              />
            </Fragment>
          ))}

          <h3>{`Conversation : ${index + 1}`}</h3>
        </Fragment>
      ))}
    </div>
  );
};

export default Conversations;
