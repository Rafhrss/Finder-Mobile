import useSWR from "swr";
import { ChatMessage, ChatRepository } from "../repository";
import { useAuth } from "@/src/contexts/AuthContext";
import { api } from "@/src/libs/api";

export const useChatRoom = (roomId: string) => {
  const { userToken } = useAuth();

  // Fetch current user ID using SWR
  const { data: currentUserId } = useSWR(
    userToken ? "currentUserId" : null,
    async () => {
      api.defaults.headers.common["Authorization"] = `Token ${userToken}`;
      return await ChatRepository.getCurrentUserId();
    },
    { revalidateOnFocus: false }
  );

  // Fetch messages using SWR
  const {
    data: messages = [],
    isLoading,
    error,
    mutate,
  } = useSWR<ChatMessage[]>(
    roomId && userToken ? `/chats/rooms/${roomId}/messages/` : null,
    async () => {
      api.defaults.headers.common["Authorization"] = `Token ${userToken}`;
      return await ChatRepository.getMessages(roomId);
    },
    {
      refreshInterval: 3000, // Optional: Poll for new messages every 3s
    }
  );

  const sendMessage = async (message: string) => {
    const newMessage = await ChatRepository.sendMessage(roomId, message);
    mutate([...messages, newMessage], false); // Optimistic UI update
    return newMessage;
  };

  return {
    currentUserId,
    messages,
    isLoading,
    error,
    sendMessage,
    mutate,
  };
};
