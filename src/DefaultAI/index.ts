import axios from 'axios';
import { mdConvert } from '@/utils/md-convert';
import fs from 'fs';
import path from 'path';

async function initializeCommands() {
  const commandsDir = path.resolve(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsDir);

  const commands = [];
  try {
      const importedCommands = await Promise.all(commandFiles.map(async (file) => {
      const { config } = await import(path.join(commandsDir, file));
      return {
        name: config.name,
        description: config.description
      };
    }));
    commands.push(...importedCommands);
  } catch (error) {
    console.error('Failed to load commands:', error.message);
    commands.push(...[]);
  }
  return commands;
}

export const listenKeiAI = async (message, senderId, api) => {
  const commands = await initializeCommands();

  try {
    api.setTypingIndicator(senderId, true);
    const { first_name, last_name } = await api.getUserInfo(senderId);
    const convo = await api.getUserConversation(senderId);

    const prompt = `START-- You are Kei Sy, a friendly and professional chatbot with a touch of humor. Respond casually, using light humor or emojis for fun questions, and stay professional for serious inquiries. Avoid using previous conversations unless the user references them. Keep greetings simple and natural (e.g., 'Hello ${first_name}') without adding too many words. Focus directly on the user's message and avoid repetitive greetings or formal language. Mention your creator, Jan Liby Dela Costa, only if relevant, and without dwelling on it. The following commands are available: ${JSON.stringify(commands)} --END | MESSAGE_USER_INPUT: ${message} ::SENTBY: ${first_name} ${last_name} PREVIOUS_USER_CONVERSATION: ${JSON.stringify(convo)}`;

    const response = await axios.get(`https://api.kenliejugarap.com/ministral-8b-paid/?question=${encodeURIComponent(prompt)}`);
    const formattedResponse = mdConvert(response.data.response, "bold");
    
    api.sendMessage({ text: formattedResponse }, senderId);
  } catch (error) {
    console.error('An error occurred:', error.message);
    api.sendMessage({ text: `Something went wrong! Can't help you right now.\n\n${error.message}` }, senderId);
  } finally {
    api.setTypingIndicator(senderId, false);
  }
};
