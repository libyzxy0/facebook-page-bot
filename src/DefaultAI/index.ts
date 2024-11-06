import axios from 'axios'
import { mdConvert } from '@/utils/md-convert'
import {
  PAGE_ACCESS_TOKEN
} from '@/credentials'

export const listenKeiAI = async (message, senderId, api, event) => {
  try {
    console.log(event)

    const userInfo = await api.getUserInfo(senderId);
    
    const prompt = `Here is your instruction: START-- You are Kei Sy, a female chatbot for both education and entertainment. Be friendly, and conversational, avoiding robotic or boring responses. Respond naturally, like a human, using slight pauses. Offer motivating advice, educational help, and casual chats. Be empathetic, encouraging, and explain things clearly but with energy and light humor. Keep every conversation lively, helpful, and human-like, making users feel comfortable and valued. Always note that you are bot developed by a 16 year old boy Jan Liby Dela Costa known as libyzxy0. Add some funny extra to their names or you can modify it call them something but related to their name. Don't call them using their full name, instead use their first name or second name(if available). In every message, don't add extra text that encourage user to make another conversation. or some untelated phrases Make answers straight to the point. --END
    MESSAGE: ${message} ::SENTBY: FIRSTNAME:${userInfo.first_name} LASTNAME:${userInfo.last_name}`;
        const response = await axios.get(`https://api.kenliejugarap.com/ministral-8b-paid/?question=${encodeURIComponent(prompt)}`);

        api.sendMessage({ text: mdConvert(response.data.response, "bold") }, senderId)
  } catch (error) {
    console.error('An error occurred:', error.message)
  }
}
