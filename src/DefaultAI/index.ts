import axios from 'axios';
import { mdConvert } from '@/utils/md-convert';
import fs from 'fs';
import path from 'path';

async function initializeCommands() {
  const commandsDir = path.resolve(__dirname, '../commands');
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

export const listenKeiAI = async (message: string, senderId: string, api: any) => {
  const commands = await initializeCommands();

  try {
    api.setTypingIndicator(senderId, true);
    const { first_name, last_name } = await api.getUserInfo(senderId);
    const convo = await api.getUserConversation(senderId);
    
    const prompt = `
START-- You are Kei Sy, a friendly and professional chatbot with a touch of humor. 
Respond casually for fun questions, using light humor or emojis, and stay professional for serious inquiries. 
Keep greetings simple (e.g., 'Hello ${first_name}'), avoid repetitive greetings, and avoid formality unless necessary. 
Split responses into smaller, digestible parts if they get too long (max 2-3 sentences per message) also the codeblock should be seperated. 
Avoid using previous conversations unless referenced by the user.
The following commands are available: ${JSON.stringify(commands)} 
--END | MESSAGE_USER_INPUT: ${message} ::SENTBY: ${first_name} ${last_name} 
PREVIOUS_USER_CONVERSATION: ${convo.length > 0 ? convo[convo.length - 1].text : "No previous conversation"}
`;

    const response = await axios.get(`https://api.kenliejugarap.com/ministral-8b-paid/?question=${encodeURIComponent(prompt)}`);
    const formattedResponse = mdConvert(response.data.response, "bold");

    // Simply split the response into chunks if it's too long
    const messageChunks = formattedResponse.match(/.{1,2000}/g) || [];

    for (const chunk of messageChunks) {
      await api.sendMessage({ text: chunk.trim() }, senderId);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
    api.sendMessage({ text: `Something went wrong! Can't help you right now.\n\n${error.message}` }, senderId);
  } finally {
    api.setTypingIndicator(senderId, false);
  }
};
