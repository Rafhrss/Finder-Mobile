import React from "react";
import { useLocalSearchParams } from "expo-router";
import ChatRoomView from "@screens/chat/views/ChatRoomView";

const ChatRoomPage = () => {
  const { id, createdAt, otherUserName } = useLocalSearchParams<{ id: string, createdAt?: string, otherUserName?: string }>();

  return <ChatRoomView roomId={id} createdAt={createdAt} otherUserName={otherUserName} />;
};

export default ChatRoomPage;
