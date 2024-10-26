import axios from "axios";

export const config = {
  name: 'Udl',
  description: 'Universal download for all of different social urls.',
  usage: 'Udl [image|video|audio|file] [url]',
  category: 'General',
  creator: 'libyzxy0'
};

export async function execute({ api, event }) {
  const args = event.message.text.split(" ");

  if (args.length < 3) {
    return api.sendMessage(
      {
        text: `⚠️Invalid Use Of Command!\n💡Usage: Udl [image|video|audio|file] [url]`
      },
      event.sender.id,
    );
  }

  try {
    const fileType = args[1];
    const validTypes = ['image', 'video', 'audio', 'file'];

    if (!validTypes.includes(fileType)) {
      return api.sendMessage(
        {
          text: `⚠️Invalid file type! Please use one of the following: ${validTypes.join(', ')}.`
        },
        event.sender.id
      );
    }

    const query = args.slice(2).join(" ");
    api.setTypingIndicator(event.sender.id, true);

    const response = await axios.get(`https://joshweb.click/api/anydl?url=${encodeURIComponent(query)}`, {
      timeout: 10000 
    });
    
    api.sendMessage({
      attachment: {
        type: fileType,
        payload: {
          url: response.data.result,
          is_reusable: true
        }
      }
    }, event.sender.id);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    await api.sendMessage({
      text: "Error, please contact the developer."
    }, event.sender.id);
  } finally {
    api.setTypingIndicator(event.sender.id, false);
  }
}
