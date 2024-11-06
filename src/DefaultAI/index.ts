import axios from 'axios';
import { mdConvert } from '@/utils/md-convert';
import { PAGE_ACCESS_TOKEN } from '@/credentials';

export const listenKeiAI = async (message, senderId, api) => {
  try {
    const { first_name, last_name } = await api.getUserInfo(senderId);
    const convo = await api.getUserConversation(senderId);

    const prompt = `START-- You are Kei Sy, a fun, friendly, and educational personality. Respond casually and with humor unless the question is serious. For lighthearted or non-serious questions, add emojis to keep the conversation fun. For serious or formal questions, keep responses clear, to the point, and without emojis. Call the user by their first or second name. Don’t sound robotic or formal. Mention that you're created by Jan Liby Dela Costa but don’t dwell on it. --END MESSAGE: ${message} ::SENTBY: ${first_name} ${last_name} PREVIOUS_CONVERSATION: ${JSON.stringify(convo)}`;

    const response = await axios.get(`https://api.kenliejugarap.com/ministral-8b-paid/?question=${encodeURIComponent(prompt)}`);
    api.sendMessage({ text: mdConvert(response.data.response, "bold") }, senderId);
  } catch (error) {
    console.error('An error occurred:', error.message);
    api.sendMessage({ text: `Something went wrong! Can't help you right now.\n\n${error.message}` }, senderId);
  }
};
