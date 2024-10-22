import axios from 'axios';

export const config = {
  name: 'shoti',
  description: 'This command is sending random beautiful girl videos from Shoti API.',
  usage: 'shoti',
  category: 'Fun',
  creator: 'libyzxy0'
};

export async function execute({
  api, event
}) {
  try {
    const response = await axios.get('https://shoti-srv2.onlitegix.com/api/v1/request-f');

    const url = response.data.data.url;
    const username = response.data.data.user.username;

    await api.sendMessage({
      attachment: {
        type: 'video',
        payload: {
          url: url,
          is_reusable: true
        }
      }
    }, event.sender.id);

    await api.sendMessage({
      text: `𝙷𝚎𝚛𝚎 𝚊𝚛𝚎 𝚜𝚘𝚖𝚎 𝚒𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗 𝚊𝚋𝚘𝚞𝚝 𝚝𝚑𝚎 𝚟𝚒𝚍𝚎𝚘 𝚊𝚋𝚘𝚟𝚎:\n\n${response.data.data.title ? `𝗧𝗶𝘁𝗹𝗲: ${response.data.data.title}\n` : ''}𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: @${username}\n𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲: ${response.data.data.user.nickname}\n𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${response.data.data.duration}`
    }, event.sender.id);
  } catch (error) {
    console.error(`Error message: ${error.message}`);
    await api.sendMessage({
      text: "Error, please contact the developer."
    }, event.sender.id);
  }
}