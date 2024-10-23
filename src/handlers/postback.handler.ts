import { API } from '@/Api'

const api = new API();

export function handlePostback(event) {
  const senderId = event.sender.id;
  const payload = event.postback.payload;

  api.sendMessage({ text: `You sent a postback with payload: ${payload}` }, senderId);
}