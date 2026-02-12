import { Kafka } from 'kafkajs';
import { env } from '../config/env.js';

const kafka = new Kafka({ clientId: 'chat-service', brokers: env.kafkaBrokers });
const producer = kafka.producer();

export const connectProducer = async () => producer.connect();

export const publishMessage = async (payload: object) => {
  await producer.send({
    topic: env.kafkaTopic,
    messages: [{ value: JSON.stringify(payload) }]
  });
};
