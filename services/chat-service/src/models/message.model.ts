import { Schema, model } from 'mongoose';

export interface MessageDocument {
  chatId: string;
  senderId: string;
  recipientId?: string;
  groupId?: string;
  body: string;
  mediaUrl?: string;
  messageType: 'TEXT' | 'AUDIO' | 'VIDEO';
  tickStatus: 'SENT' | 'DELIVERED' | 'READ';
  createdAt: Date;
}

const messageSchema = new Schema<MessageDocument>({
  chatId: { type: String, required: true },
  senderId: { type: String, required: true },
  recipientId: String,
  groupId: String,
  body: { type: String, required: true },
  mediaUrl: String,
  messageType: { type: String, enum: ['TEXT', 'AUDIO', 'VIDEO'], default: 'TEXT' },
  tickStatus: { type: String, enum: ['SENT', 'DELIVERED', 'READ'], default: 'SENT' },
  createdAt: { type: Date, default: Date.now }
});

export const MessageModel = model<MessageDocument>('Message', messageSchema);
