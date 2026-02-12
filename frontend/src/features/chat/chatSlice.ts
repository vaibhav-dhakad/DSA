import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

export type TickStatus = 'SENT' | 'DELIVERED' | 'READ';

export interface Message {
  id: string;
  senderId: string;
  content: string;
  sentAt: string;
  tick: TickStatus;
}

export interface ChatSummary {
  id: string;
  title: string;
  isGroup: boolean;
  isPremium: boolean;
  online: boolean;
  unread: number;
  typing: boolean;
  lastSeen: string;
  messages: Message[];
}

interface ChatState {
  chats: ChatSummary[];
  activeChatId: string;
  searchTerm: string;
}

const initialState: ChatState = {
  chats: [
    {
      id: 'grp-001',
      title: 'Architecture Guild',
      isGroup: true,
      isPremium: true,
      online: true,
      unread: 3,
      typing: true,
      lastSeen: 'online',
      messages: [
        { id: 'm1', senderId: 'u1', content: 'Kafka lag is green now.', sentAt: '09:11', tick: 'READ' },
        { id: 'm2', senderId: 'me', content: 'Great, deploying chat-service patch.', sentAt: '09:12', tick: 'DELIVERED' }
      ]
    },
    {
      id: 'dm-001',
      title: 'Ava Johnson',
      isGroup: false,
      isPremium: false,
      online: false,
      unread: 0,
      typing: false,
      lastSeen: 'last seen 2m ago',
      messages: [
        { id: 'm3', senderId: 'me', content: 'Can you review the Prisma migration?', sentAt: '08:52', tick: 'READ' },
        { id: 'm4', senderId: 'u2', content: 'On it. Looks clean.', sentAt: '08:53', tick: 'READ' }
      ]
    },
    {
      id: 'grp-002',
      title: 'Design Squad',
      isGroup: true,
      isPremium: false,
      online: true,
      unread: 1,
      typing: false,
      lastSeen: 'online',
      messages: [
        { id: 'm5', senderId: 'u3', content: 'New dark theme shipped 🎨', sentAt: '08:15', tick: 'SENT' }
      ]
    }
  ],
  activeChatId: 'grp-001',
  searchTerm: ''
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChat(state, action: PayloadAction<string>) {
      state.activeChatId = action.payload;
      const chat = state.chats.find((item) => item.id === action.payload);
      if (chat) chat.unread = 0;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    sendMessage(state, action: PayloadAction<{ chatId: string; content: string }>) {
      const chat = state.chats.find((item) => item.id === action.payload.chatId);
      if (!chat || !action.payload.content.trim()) return;
      chat.messages.push({
        id: `m-${Date.now()}`,
        senderId: 'me',
        content: action.payload.content.trim(),
        sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tick: 'SENT'
      });
    },
    updateTickStatus(state, action: PayloadAction<{ chatId: string; messageId: string; tick: TickStatus }>) {
      const chat = state.chats.find((item) => item.id === action.payload.chatId);
      const message = chat?.messages.find((item) => item.id === action.payload.messageId);
      if (message) message.tick = action.payload.tick;
    }
  }
});

export const { setActiveChat, setSearchTerm, sendMessage, updateTickStatus } = chatSlice.actions;

export const selectChatState = (state: { chat: ChatState }) => state.chat;

export const selectFilteredChats = createSelector([selectChatState], (chatState) => {
  const query = chatState.searchTerm.toLowerCase().trim();
  if (!query) return chatState.chats;
  return chatState.chats.filter((chat) => chat.title.toLowerCase().includes(query));
});

export const selectActiveChat = createSelector([selectChatState], (chatState) =>
  chatState.chats.find((chat) => chat.id === chatState.activeChatId)
);

export default chatSlice.reducer;
