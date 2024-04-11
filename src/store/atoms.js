import { atom } from "recoil";

export const conversationState = atom({
  key: "conversationState",
  default: [],
});

export const pastConversationsState = atom({
  key: "pastConversationsState",
  default: [],
});
