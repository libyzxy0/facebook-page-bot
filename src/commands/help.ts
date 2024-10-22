import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fontText } from '@/utils/fonts'

export const config = {
  name: 'Help',
  description: 'Sends all available commands in this bot.',
  usage: 'help',
  category: 'General',
  creator: 'libyzxy0'
};

export async function execute({ api, event }) {
  try {
    api.setTypingIndicator(event.sender.id, true);
    const commandsDir = path.join(new URL('../commands', import.meta.url).pathname);
    const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.ts'));

    const commands = await Promise.all(commandFiles.map(async (file) => {
      const command = await import(path.join(commandsDir, file));

      return `${fontText(command.config.name.toUpperCase(), "bold")}\n   📄 ${fontText("Description", "boldItalic")}: ${command.config.description}\n   📝 ${fontText("Usage", "boldItalic")}: ${command.config.usage}\n   🏷️ ${fontText("Category", "boldItalic")}: ${command.config.category}\n   👤 ${fontText("Creator", "boldItalic")}: ${command.config.creator}`;
    }));

    const totalCommands = commandFiles.length;
    const helpMessage = `${fontText("Kei Sy Commands", "bold")}\n${fontText(`Here are the ${totalCommands} awesome commands that you can use with Kei Sy`, "sansSerifItalic")}:\n\n${commands.join('\n\n')}\n\n${fontText("Tip", "bold")}: ${fontText("You can also use '/' to show available commands or navigate to Info page and click the action button 'Commands'.", "sansSerifItalic")}`;

    await api.sendMessage({
      text: helpMessage
    }, event.sender.id);
  } catch (error) {
    console.error(`Error sending help message: ${error.message}`);
  } finally {
    api.setTypingIndicator(event.sender.id, false);
  }
}
