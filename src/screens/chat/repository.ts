import { api } from "@/src/libs/api";

export interface ChatUser {
  id: string;
  email: string;
  name: string;
  profile_picture: string | null;
}

export interface ChatRoom {
  id: string;
  report: string;
  user1: ChatUser;
  user2: ChatUser;
  created_at: string;
  last_message?: ChatMessage | null;
}

export interface ChatMessage {
  id: string;
  chatroom: string;
  sender: ChatUser;
  message: string;
  created_at: string;
}

export const ChatRepository = {
  // Create or retrieve a chat room for a report
  createOrGetRoom: async (reportId: string): Promise<ChatRoom> => {
    const response = await api.post(`/chats/reports/${reportId}/rooms/`);
    return response.data;
  },

  // Get all chat rooms
  getRooms: async (): Promise<ChatRoom[]> => {
    const response = await api.get("/chats/rooms/");
    return response.data;
  },

  // Get message history for a room
  getMessages: async (roomId: string | number): Promise<ChatMessage[]> => {
    const response = await api.get(`/chats/rooms/${roomId}/messages/`);
    return response.data;
  },

  // Send a new message
  sendMessage: async (roomId: string | number, message: string): Promise<ChatMessage> => {
    const response = await api.post(`/chats/rooms/${roomId}/messages/`, { message });
    return response.data;
  },

  // Get Current User ID
  getCurrentUserId: async (): Promise<string> => {
    const { data } = await api.get("/users/me/");
    return data.id;
  }
};
