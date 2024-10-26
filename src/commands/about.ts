import axios from 'axios';
import fs from 'fs';
import path from 'path';
import {
  fontText
} from '@/utils/fonts'

export const config = {
  name: 'About',
  description: 'Some information about Kei Sy.',
  usage: 'About',
  category: 'General',
  creator: 'libyzxy0'
};

export async function execute({
  api, event
}) {
  try {
    api.setTypingIndicator(event.sender.id, true);
    await api.sendMessage({
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: `${fontText("Some information about Kei Sy", "bold")}\n\n${fontText("Name", "sansSerifBold")}: ${fontText("Kei Sy", 'sansSerifItalic')}\n${fontText("Nickname", "sansSerifBold")}: ${fontText("Kei", 'sansSerifItalic')}\n${fontText("Gender", "sansSerifBold")}: ${fontText("Female", 'sansSerifItalic')}\n${fontText("Master", "sansSerifBold")}: ${fontText("Jan Liby Dela Costa", 'sansSerifItalic')}\n\n${fontText("Kei is a chatbot designed to assist with both education and entertainment. She’s here to help with school assignments, activities, and more, providing not just answers but clear, detailed explanations. Kei aims to keep you engaged and feeling supported, whether you're looking for academic help or just a friendly conversation. With her balanced approach, Kei is the perfect companion for learning and having fun, making sure you never feel alone or bored.", "sansSerifItalic")}`,
          buttons: [
            {
              type: "web_url",
              url: "https://keisy-bot.vercel.app",
              title: "Learn More",
            }, 
            {
              type: "web_url",
              url: "https://keisy-bot.vercel.app/feedback",
              title: "Feedback",
            }
          ]
        }
      }
    }, event.sender.id);
  } catch (error) {
    console.error(`Error sending help message: ${error.message}`);
  } finally {
    api.setTypingIndicator(event.sender.id, false);
  }
}