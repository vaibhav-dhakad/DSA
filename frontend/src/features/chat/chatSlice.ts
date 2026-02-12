import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

export type TickStatus = 'SENT' | 'DELIVERED' | 'READ';
export type MessageType = 'TEXT' | 'AUDIO' | 'VIDEO';

export interface Message {
  id: string;
  senderId: string;
  content: string;
  sentAt: string;
  tick: TickStatus;
  messageType: MessageType;
  mediaUrl?: string;
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
  currentUserId: 'me' | 'u2';
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
        { id: 'm1', senderId: 'u1', content: 'Kafka lag is green now.', sentAt: '09:11', tick: 'READ', messageType: 'TEXT' },
        { id: 'm2', senderId: 'me', content: 'Great, deploying chat-service patch.', sentAt: '09:12', tick: 'DELIVERED', messageType: 'TEXT' }
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
        { id: 'm3', senderId: 'me', content: 'Can you review the Prisma migration?', sentAt: '08:52', tick: 'READ', messageType: 'TEXT' },
        { id: 'm4', senderId: 'u2', content: 'On it. Looks clean.', sentAt: '08:53', tick: 'READ', messageType: 'TEXT' },
        { id: 'm6', senderId: 'u2', content: 'Sprint-demo-voice-note.m4a', sentAt: '08:55', tick: 'READ', messageType: 'AUDIO', mediaUrl: 'https://cdn.example.com/audio/sprint-demo-voice-note.m4a' }
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
        { id: 'm5', senderId: 'u3', content: 'Walkthrough.mp4', sentAt: '08:15', tick: 'SENT', messageType: 'VIDEO', mediaUrl: 'https://cdn.example.com/video/walkthrough.mp4' }
      ]
    }
  ],
  activeChatId: 'grp-001',
  searchTerm: '',
  currentUserId: 'me'
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
    setCurrentUser(state, action: PayloadAction<'me' | 'u2'>) {
      state.currentUserId = action.payload;
    },
    sendMessage(
      state,
      action: PayloadAction<{ chatId: string; content: string; messageType: MessageType; mediaUrl?: string }>
    ) {
      const chat = state.chats.find((item) => item.id === action.payload.chatId);
      if (!chat || !action.payload.content.trim()) return;
      chat.messages.push({
        id: `m-${Date.now()}`,
        senderId: state.currentUserId,
        content: action.payload.content.trim(),
        sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tick: 'SENT',
        messageType: action.payload.messageType,
        mediaUrl: action.payload.mediaUrl
      });
    },
    updateTickStatus(state, action: PayloadAction<{ chatId: string; messageId: string; tick: TickStatus }>) {
      const chat = state.chats.find((item) => item.id === action.payload.chatId);
      const message = chat?.messages.find((item) => item.id === action.payload.messageId);
      if (message) message.tick = action.payload.tick;
    }
  }
});

export const { setActiveChat, setSearchTerm, setCurrentUser, sendMessage, updateTickStatus } = chatSlice.actions;

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
