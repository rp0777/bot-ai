import { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { conversationState } from "../store/atoms";
import InitialPage from "../components/InitialPage";
import CurrentCoversation from "../components/CurrentCoversation";

const NewChat = () => {
  const conversation = useRecoilValue(conversationState);

  return (
    <Fragment>
      {conversation.length === 0 ? <InitialPage /> : <CurrentCoversation />}
    </Fragment>
  );
};

export default NewChat;
