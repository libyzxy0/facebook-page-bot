import axios from 'axios';
import { setupCmds } from '@/handlers/setupcommand.handler'
export const config = {
  name: 'SetupCMD',
  description: 'For setting up messenger commands, admin use only.',
  usage: 'SetupCMD',
  category: 'System',
  creator: 'libyzxy0'
};

export async function execute({
  api, event
}) {
  try {
    if(event.sender.id !== "8232207860235773") return api.sendMessage({
      text: "🚫 You can use this command because you're a user, this is for admin use only."
    }, event.sender.id);
    const isSucces = await setupCmds();
    await api.sendMessage({
      text: isSucces ? 'Commands setted up!' : 'Failed to setup commands.'
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