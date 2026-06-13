import { useAuth } from "@/src/contexts/AuthContext";
import ChatListView from "@screens/chat/views";

const Chat = () => {
  const { userToken } = useAuth();
  return <ChatListView key={userToken || "guest"} />;
};

export default Chat;
