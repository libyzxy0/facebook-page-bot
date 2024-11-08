import axios from 'axios';

export const config = {
  name: 'Imagine',
  description: 'Generate any image using text, powered by flux.',
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

    const queryText = args.join(" ");
    
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/XLabs-AI/flux-RealismLora",
      { "inputs": queryText },
      {
        headers: {
          Authorization: "Bearer " + process.env.HF_APIKEY,
          "Content-Type": "application/json"
        }
      }
    );

    const imageUrl = `data:image/jpeg;base64,${response.data.toString('base64')}`;
    console.log(imageUrl);
    const isSent = await api.sendMessage({
      attachment: {
        type: 'image',
        payload: {
          url: imageUrl,
          is_reusable: true
        }
      }
    }, event.sender.id);

    if (!isSent) {
      api.sendMessage({ text: "Failed to generate your image!" });
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
