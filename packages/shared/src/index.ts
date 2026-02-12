export interface JwtPayload {
  userId: string;
  email: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  premiumStatus: boolean;
}

export type TickStatus = 'SENT' | 'DELIVERED' | 'READ';
export type MessageType = 'TEXT' | 'AUDIO' | 'VIDEO';

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  recipientId?: string;
  groupId?: string;
  body: string;
  mediaUrl?: string;
  messageType: MessageType;
  tickStatus: TickStatus;
  createdAt: string;
}
