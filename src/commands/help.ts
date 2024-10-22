import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const config = {
  name: 'help',
  description: 'Sends all available commands in this bot.',
  usage: 'help',
  category: 'General',
  creator: 'libyzxy0'
};

export async function execute({ api, event }) {
  try {
    const commandsDir = path.join(new URL('../commands', import.meta.url).pathname);
    const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.ts'));

    // Fetch font variations for each command name using the font API
    const commands = await Promise.all(commandFiles.map(async (file) => {
      const command = await import(path.join(commandsDir, file));

      const fontResponse = await axios.get(`https://joshweb.click/api/font?q=${encodeURIComponent(command.config.name.toUpperCase())}`);
      const fontResult = fontResponse.data[10]?.result || command.config.name.toUpperCase();

      return `${fontResult}\n   📄 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${command.config.description}\n   📝 𝗨𝘀𝗮𝗴𝗲: ${command.config.usage}\n   🏷️ 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: ${command.config.category}\n   👤 𝗖𝗿𝗲𝗮𝘁𝗼𝗿: ${command.config.creator}`;
    }));

    const totalCommands = commandFiles.length;
    const helpMessage = `𝗞𝗲𝗶 𝗦𝘆 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀\n𝙷𝚎𝚛𝚎 𝚊𝚛𝚎 𝚝𝚑𝚎 ${totalCommands} 𝚊𝚠𝚎𝚜𝚘𝚖𝚎 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜 𝚝𝚑𝚊𝚝 𝚢𝚘𝚞 𝚌𝚊𝚗 𝚞𝚜𝚎 𝚠𝚒𝚝𝚑 𝙺𝚎𝚒 𝚂𝚢:\n\n${commands.join('\n\n')}`;

    await api.sendMessage({
      text: helpMessage
    }, event.sender.id);
  } catch (error) {
    console.error(`Error sending help message: ${error.message}`);
  }
}
