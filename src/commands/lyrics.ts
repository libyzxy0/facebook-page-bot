import axios from "axios";

import { fontText } from '@/utils/fonts'

export const config = {
  name: 'Lyrics',
  description: 'Command that lets you find any lyrics of your favorite music.',
  usage: 'Music [title]',
  category: 'General',
  creator: 'libyzxy0'
};

export async function execute({
  api, event
}) {
  const args = event.message.text.split(" ");

  if (args.length < 2) {
    return api.sendMessage(
      {
        text: `⚠️Invalid Use Of Command!\n💡Usage: Lyrics [title]`
      },
      event.sender.id,
    );
  }

  try {
    args.shift();
    api.setTypingIndicator(event.sender.id, true);

    const query = args.join(" ");
    
    const response = await axios.get(`https://joshweb.click/search/lyrics?q=${encodeURIComponent(query)}`)
    
    await api.sendMessage({
      text: `${fontText(`${response.data.result.title} by ${response.data.result.artist} Lyrics`, "bold")}\n\n${fontText(response.data.result.lyrics, "sansSerifItalic")}\n\n${fontText("Thanks to joshweb.click API 💙", "bold")}`
    }, event.sender.id);
    api.sendMessage({
      attachment: {
        type: 'image',
        payload: {
          url: response.data.result.image,
          is_reusable: true
        }
      }
    }, event.sender.id);

  } catch (error) {
    console.error(`Error: ${error}`);
    await api.sendMessage({
      text: "Error, please contact the developer."
    }, event.sender.id);
  } finally {
    api.setTypingIndicator(event.sender.id, false);
  }
}