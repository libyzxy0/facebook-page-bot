import { sendMessage } from '@/handlers/message.handler'

export function handlePostback(event) {
  const senderId = event.sender.id;
  const payload = event.postback.payload;

  sendMessage(senderId, { text: `You sent a postback with payload: ${payload}` });
}