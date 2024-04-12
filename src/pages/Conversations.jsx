import { useRecoilState, useRecoilValue } from "recoil";
import {
  filteredConversationsState,
  pastConversationsState,
} from "../store/atoms";
import { Fragment, useEffect, useState } from "react";
import ConversationCard from "../components/ConversationCard";
import Filters from "../components/Filters";

const ConvoCards = ({ conversation, index }) => (
  <div
    key={index}
    className=" dark:bg-slate-500 w-auto flex flex-col justify-center items-center gap-4 bg-[#207fb633] p-4 rounded-xl"
  >
    <h3 className=" dark:text-slate-1000">{`Conversation : ${index + 1}`}</h3>

    {conversation.map((chat) => (
      <Fragment key={chat.id}>
        <ConversationCard chat={chat} isResponse={false} isReadOnly={true} />

        <ConversationCard chat={chat} isResponse={true} isReadOnly={true} />
      </Fragment>
    ))}
  </div>
);

const Conversations = () => {
  const [pastConversations, setPastConversations] = useRecoilState(
    pastConversationsState
  );
  const filteredConversations = useRecoilValue(filteredConversationsState);
  const [dateCategorizedConvos, setDateCategorizedConvos] = useState({
    today: [],
    thisMonth: [],
    thisYear: [],
  });

  useEffect(() => {
    const storedConversations = localStorage.getItem("pastConversations");

    if (storedConversations) {
      const parsedConversations = JSON.parse(storedConversations);

      setPastConversations(parsedConversations);
    }
  }, []);

  useEffect(() => {
    const categorizedConvos = {
      today: [],
      thisMonth: [],
      thisYear: [],
    };

    if (pastConversations.length > 0) {
      const todayConvos = [];
      pastConversations.map((conversation) => {
        const convoDate =
          typeof conversation[0].date === "string"
            ? conversation[0].date.split("T")[0]
            : conversation[0].date.toISOString().split("T")[0];

        if (convoDate === new Date().toISOString().split("T")[0]) {
          todayConvos.push(conversation);
        }
      });

      categorizedConvos.today = todayConvos;

      setDateCategorizedConvos(categorizedConvos);
    }

    if (!pastConversations) {
      setDateCategorizedConvos([]);
    }
  }, [pastConversations]);

  return (
    <div className=" w-full h-full overflow-auto flex flex-col justify-start items-center gap-4 p-3 pb-5 ">
      <Filters />

      {/* Conversation Cards */}
      {filteredConversations.length > 0 ? (
        filteredConversations.map((chat, index) => (
          <Fragment key={index}>
            <ConversationCard
              chat={chat}
              isResponse={false}
              isReadOnly={true}
            />

            <ConversationCard chat={chat} isResponse={true} isReadOnly={true} />
          </Fragment>
        ))
      ) : (
        <Fragment>
          {/* Today's Conversations */}
          {dateCategorizedConvos.today.length > 0 && (
            <Fragment>
              <h2 className=" dark:text-white text-xl font-bold">
                {"Today's Conversation History : "}
              </h2>

              {dateCategorizedConvos.today.map((conversation, index) => (
                <Fragment key={index}>
                  <ConvoCards conversation={conversation} index={index} />
                </Fragment>
              ))}
            </Fragment>
          )}

          {/* This Month's Conversations */}
          {dateCategorizedConvos.thisMonth.length > 0 && (
            <Fragment>
              <h2 className=" dark:text-white text-xl font-bold">
                {"This Month's Conversation History : "}
              </h2>

              {dateCategorizedConvos.thisMonth.map((conversation, index) => (
                <Fragment key={index}>
                  <ConvoCards conversation={conversation} index={index} />
                </Fragment>
              ))}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Conversations;
