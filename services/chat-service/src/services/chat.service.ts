import { MessageModel } from '../models/message.model.js';
import { SendMessageDto } from '../dtos/message.dto.js';
import { publishMessage } from '../events/kafka.producer.js';

export class ChatService {
  async sendMessage(input: SendMessageDto) {
    const message = await MessageModel.create({ ...input, tickStatus: 'SENT' });
    await publishMessage({ messageId: message.id, tickStatus: 'SENT' });
    return message;
  }

  async updateTick(messageId: string, tickStatus: 'DELIVERED' | 'READ') {
    return MessageModel.findByIdAndUpdate(messageId, { tickStatus }, { new: true });
  }
}
