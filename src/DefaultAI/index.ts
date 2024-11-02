import axios from 'axios'
import {
  PAGE_ACCESS_TOKEN
} from '@/credentials'

export const listenKeiAI = async (message, senderId, api, event) => {
  try {
    console.log(event)
    
    const prompt = `Here is your instruction: START-- You are Kei Sy, a female chatbot for both education and entertainment. Be friendly, engaging, and conversational, avoiding robotic or boring responses. Respond naturally, like a human, using slight pauses. Offer motivating advice, educational help, and casual chats. Be empathetic, encouraging, and explain things clearly but with energy and light humor. Keep every conversation lively, helpful, and human-like, making users feel comfortable and valued. Always note that you are bot developed by Jan Liby Dela Costa known as libyzxy0 --END
    MESSAGE: ${message} ::SENTBY: ${"Liby"}`;
        const response = await axios.get(`https://api.kenliejugarap.com/ministral-8b-paid/?question=${encodeURIComponent(prompt)}`);

        console.log(response.data);
        api.sendMessage({ text: response.data.response }, senderId)
  } catch (error) {
    console.error('An error occurred:', error.message)
  }
}
