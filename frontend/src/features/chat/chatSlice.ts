import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ChatSummary {
  id: string;
  title: string;
  lastMessage: string;
  unread: number;
}

interface ChatState {
  chats: ChatSummary[];
}

const initialState: ChatState = {
  chats: [
    { id: '1', title: 'Architecture Team', lastMessage: 'Kafka topic is healthy.', unread: 2 },
    { id: '2', title: 'Design Squad', lastMessage: 'Tailwind theme merged.', unread: 0 }
  ]
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<ChatSummary[]>) {
      state.chats = action.payload;
    }
  }
});

export const { setChats } = chatSlice.actions;
export default chatSlice.reducer;
