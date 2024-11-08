import {
  listenKeiAI
} from '@/DefaultAI'
import {
  API
} from '@/Api'

const apiFunctions = new API();

export async function handleMessage(event) {
  const senderId = event.sender.id;
  const messageText = event.message ? event.message.text?.toLowerCase() : null;

  const args = messageText?.split(' ');
  const commandName = args?.shift();
  //const commandNameMessenger = event?.message?.commands[0]?.name?.toLowerCase();
  
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
        try {
          listenKeiAI(event.message.text, event.sender.id, apiFunctions, event);
        } catch (err) {
          console.log("AI Handler Error:", err);
        }
      } else {
        console.log(error)
        apiFunctions.sendMessage( {
          text: "Failed to execute command, something went wrong."
        }, event.sender.id)
      }
    }
  }
}
