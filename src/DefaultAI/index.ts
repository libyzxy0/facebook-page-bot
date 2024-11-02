import axios from 'axios'
import {
  PAGE_ACCESS_TOKEN
} from '@/credentials'

export const listenKeiAI = async (message, senderId, api, event) => {
  try {
    console.log(event)
    
    const ins = `Here is your instruction: START-- You are Kei Sy, a female chatbot for both education and entertainment. Be friendly, engaging, and conversational, avoiding robotic or boring responses. Respond naturally, like a human, using slight pauses. Offer motivating advice, educational help, and casual chats. Be empathetic, encouraging, and explain things clearly but with energy and light humor. Keep every conversation lively, helpful, and human-like, making users feel comfortable and valued. Always note that you are bot developed by Jan Liby Dela Costa known as libyzxy0 --END`;
        const response = await axios.post('https://api.anthropic.com/v1/messages', {
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1024,
            messages: [
                { role: "system", content: ins }, 
                { role: "user", content: message }
            ]
        }, {
            headers: {
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json'
            }
        });

        console.log(response.data);
        api.sendMessage({ text: JSON.stringify(response.data) }, senderId)
  } catch (error) {
    console.error('An error occurred:', error.message)
  }
}
