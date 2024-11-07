import { fontText } from '@/utils/fonts'

export const config = {
  name: 'Imagine',
  description: 'Imagine any image, powered by flux.',
  usage: 'Imagine [query]',
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
        text: `⚠️Invalid Use Of Command!\n💡Usage: Imagine [query]`
      },
      event.sender.id,
    );
  }

  try {
    args.shift();
    api.setTypingIndicator(event.sender.id, true);

    const query = args.join(" ");
    
    const url = `https://api.kenliejugarap.com/flux-realism/?width=1024&height=1024&prompt=${encodeURIComponent(query)}`;
    
    const isSent = await api.sendMessage({
      attachment: {
        type: 'image',
        payload: {
          url: url,
          is_reusable: true
        }
      }
    }, event.sender.id);
    
    if(!isSent) {
      api.sendMessage({ text: "Failed to generate your image!" })
    }

  } catch (error) {
    console.error(`Error: ${error}`);
    await api.sendMessage({
      text: "Error, please contact the developer."
    }, event.sender.id);
  } finally {
    api.setTypingIndicator(event.sender.id, false);
  }
}
