import axios from 'axios';

export const config = {
  name: 'Ask',
  description: 'AI Command uses the joshweb.click API gpt4 turbo.',
  usage: 'Ask [question]',
  category: 'Education',
  creator: 'libyzxy0'
};

export async function execute({
  api, event
}) {
  const args = event.message.text.split(" ");
  
  if (args.length < 2) {
    return api.sendMessage(
      { text: `⚠️Invalid Use Of Command!\n💡Usage: Ask [question]`},
      event.sender.id,
    );
  }
    
  try {
    api.setTypingIndicator(event.sender.id, true);
    args.shift();
      
    const response = await axios.get(`https://joshweb.click/gpt4?prompt=${args.join(" ")}&uid=${event.sender.id}`);

    await api.sendMessage({
      text: `${response.data.gpt4}`
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