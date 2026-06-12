import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ChatRoomView } from "@screens/chat/views";

const ChatRoomPage = () => {
  const { id, createdAt, otherUserName, otherUserAvatar, reportId } = useLocalSearchParams<{ 
    id: string, 
    createdAt?: string, 
    otherUserName?: string,
    otherUserAvatar?: string,
    reportId?: string
  }>();

  return (
    <ChatRoomView 
      roomId={id} 
      createdAt={createdAt} 
      otherUserName={otherUserName} 
      otherUserAvatar={otherUserAvatar}
      reportId={reportId}
    />
  );
};

export default ChatRoomPage;
