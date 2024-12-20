import { HfInference } from "@huggingface/inference";
import { mdConvert } from '@/utils/md-convert';

export const config = {
  name: 'Ask',
  description: 'Ask anything uses NousResearch/Hermes-3-Llama-3.1-8B model from huggingface.co',
  usage: 'Ask [question]',
  category: 'Education',
  creator: 'libyzxy0'
};

const hfApiKey = process.env.HF_APIKEY;
if (!hfApiKey) {
  throw new Error('Missing HF_APIKEY environment variable');
}

const client = new HfInference(hfApiKey);

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
      
    const response = await client.chatCompletion({
      model: "NousResearch/Hermes-3-Llama-3.1-8B",
      messages: [
        { "role": "system", "content": "You are not a person, you are a AI command named Ask under Kei Sy chatbot. AI model NousResearch/Hermes-3-Llama-3.1-8B from huggingface.co" },
        { "role": "user", "content": args.join(" ") }
      ],
      max_tokens: 500,
    });
    
    await api.sendMessage({
      text: mdConvert(response.choices[0].message.content)
    }, event.sender.id);
  } catch (error) {
    console.error(`Error message: ${error.message}`);
    await api.sendMessage({
      text: "Something went wrong."
    }, event.sender.id);
  } finally {
    api.setTypingIndicator(event.sender.id, false);
  }
}
