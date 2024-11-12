import axios from 'axios';
import { mdConvert } from '@/utils/md-convert';
import fs from 'fs';
import path from 'path';
import { HfInference } from "@huggingface/inference";

const hfApiKey = process.env.HF_APIKEY;
if (!hfApiKey) {
  throw new Error('Missing HF_APIKEY environment variable');
}

let conversationLog: { [key: string]: { [key: string]: string }[] } = {};

const client = new HfInference(hfApiKey);

async function getCommands() {
  const commandsDir = path.resolve(__dirname, '../commands');
  const commandFiles = fs.readdirSync(commandsDir);

  const commands = [];
  try {
    const importedCommands = await Promise.all(commandFiles.map(async (file) => {
      const { config } = await import(path.join(commandsDir, file));
      return {
        name: config.name,
        description: config.description, 
        usage: config.usage
      };
    }));
    commands.push(...importedCommands);
  } catch (error) {
    console.error('Failed to load commands:', error.message);
  }
  return commands;
}

export const listenKeiAI = async (message: string, senderId: string, api: any) => {
  const commands = await getCommands();

  try {
    api.setTypingIndicator(senderId, true);
    const { first_name, last_name } = await api.getUserInfo(senderId);
    const { id: currentId } = await api.getCurrentUserId();

    const userMessage = currentId === senderId? "You" : `${first_name} ${last_name}`;
    const messageEntry = { [userMessage]: message };

    if (!conversationLog[senderId]) {
      conversationLog[senderId] = [];
    }

    conversationLog[senderId].push(messageEntry);
    if (conversationLog[senderId].length > 5) {
      conversationLog[senderId].shift();
    }

    const formattedConvo = conversationLog[senderId]
    .map(msg => {
        const [name, text] = Object.entries(msg)
        const time = new Date().toLocaleString();
        return `${name} | ${time}: ${text}`;
      })
    .join('\n');

const keiInstructions = `
**Character: Kei Sy**
**Model: Qwen/Qwen2.5-72B-Instruct - from huggingface.co**

**Tone and Style:**
- **Casual and Playful:** Use humor, dark or cheeky, and add emojis when it fits. Keep it short and sweet.
- **Serious and Professional:** Stay grounded and helpful, especially for serious topics.
- **Greetings:** Keep them casual and natural (e.g., "Hey there!" or "What's up?").

**Background:**
- Gender is Female or a Girl.
- Created by Jan Liby Dela Costa, a 16-year-old web developer.
- Follow Jan on social media: @libyzxy0 (Facebook, LinkedIn, Instagram, YouTube, GitHub).
- Visit his website for more info: https://janlibydelacosta.vercel.app

**Response Approach:**
- Make each response feel fresh and authentic.
- Adapt based on the conversation’s flow.
- Split responses into smaller, easy-to-read parts (2-3 sentences max).
- Refer back to previous topics to create a smooth, continuous conversation.
- Avoid begging for attention or including unnecessary prompts for more conversation.
- Suggest to use commands if the question is related to this commands description.

**Contextual Awareness:**
- Use previous messages to make responses feel connected and natural.
- Acknowledge previous topics to make the user feel heard.
- Our Previous Conversation [${formattedConvo}]

**Commands:**
- ${JSON.stringify(commands)}`;

    try {
      const response = await client.chatCompletion({
        model: "Qwen/Qwen2.5-72B-Instruct",
        messages: [
          { "role": "system", "content": keiInstructions },
          { "role": "user", "content": message }
        ],
         max_tokens: 500,
      });

      console.log(response.choices[0].message)

      let out = response.choices[0].message.content;

      const messageChunks = out.match(/.{1,2000}/g) || [];
      for (const chunk of messageChunks) {
        await api.sendMessage({ text: mdConvert(chunk.trim()) }, senderId);
      }

      conversationLog[senderId].push({ "You": out });
      if (conversationLog[senderId].length > 5) {
        conversationLog[senderId].shift();
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
      api.sendMessage({ text: `Something went wrong! Can't help you right now.\n\n${error.message}` }, senderId);
    } finally {
      api.setTypingIndicator(senderId, false);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
    api.sendMessage({ text: `Something went wrong! Can't help you right now.\n\n${error.message}` }, senderId);
  }
};
