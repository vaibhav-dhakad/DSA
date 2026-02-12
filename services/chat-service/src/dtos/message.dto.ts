export type MessageType = 'TEXT' | 'AUDIO' | 'VIDEO';

export interface SendMessageDto {
  chatId: string;
  senderId: string;
  recipientId?: string;
  groupId?: string;
  body: string;
  mediaUrl?: string;
  messageType: MessageType;
}
