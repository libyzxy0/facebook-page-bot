import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { PAGE_ACCESS_TOKEN } from '@/credentials'

export async function setupCmds() {
  try {
    const commandsDir = path.join(new URL('../commands', import.meta.url).pathname);
    const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.ts'));

    const commands = await Promise.all(commandFiles.map(async (file) => {
      const command = await import(path.join(commandsDir, file));
      return {
        name: command.config.name,
        description: command.config.description
      };
    }));

    const data = {
      commands: [{
        locale: "default",
        commands
      }]
    };

    const response = await axios.post('https://graph.facebook.com/v21.0/me/messenger_profile', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PAGE_ACCESS_TOKEN}`
      }
    });
    return true;
  } catch (error) {
    console.error(`Error sending help message: ${error}`);
    return false;
  }
}