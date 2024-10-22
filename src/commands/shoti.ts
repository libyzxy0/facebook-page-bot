import axios from 'axios';
import { fontText } from '@/utils/fonts'

export const config = {
  name: 'Shoti',
  description: 'Random beautiful girl videos from Shoti API.',
  usage: 'shoti',
  category: 'Fun',
  creator: 'libyzxy0'
};

export async function execute({
  api, event
}) {
  try {
    api.setTypingIndicator(event.sender.id, true);
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
      text: `${fontText("Here are the information about the video above", "sansSerifItalic")}:\n\n${response.data.data.title ? `${fontText("Title", "bold")}: ${response.data.data.title}\n` : ''}${fontText("Username", "bold")}: @${username}\n${fontText("Nickname", "bold")}: ${response.data.data.user.nickname}\n${fontText("Duration", "bold")}: ${response.data.data.duration}\n${fontText("Region", "bold")}: ${response.data.data.region}`
    }, event.sender.id);
  } catch (error) {
    console.error(`Error message: ${error.message}`);
    await api.sendMessage({
      text: "Error, please contact the developer."
    }, event.sender.id);
  } finally {
    api.setTypingIndicator(event.sender.id, false);
  }
}