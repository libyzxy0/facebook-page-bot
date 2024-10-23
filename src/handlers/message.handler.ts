import {
  listenKeiAI
} from '@/DefaultAI'
import {
  API
} from '@/Api'

const apiFunctions = new API();

export async function handleMessage(event) {
  const senderId = event.sender.id;
  const messageText = event.message.text.toLowerCase();

  const args = messageText.split(' ');
  const commandName = args.shift();

  if (commandName) {
    try {
      let {
        execute
      } = await import(`../commands/${commandName}`);
      execute( {
        event: event,
        api: apiFunctions
      });
    } catch (error) {
      if (error.code == "ERR_MODULE_NOT_FOUND") {
        const api = apiFunctions;
        listenKeiAI(event.message.text, event.sender.id, api, event);
      } else {
        sendMessage( {
          text: "Failed to execute command, something went wrong."
        })
      }
    }
  }
}