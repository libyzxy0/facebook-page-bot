import { API } from '@/Api'

const api = new API();

export async function handlePostback(event) {
  const senderId = event.sender.id;
  const payload = JSON.parse(event.postback.payload);
  
  const commandName = payload.commandName;

  if (commandName) {
    try {
      let {
        handlePostBack
      } = await import(`../commands/${commandName}`);
      handlePostBack({ api, event, payload });
    } catch (error) {
      console.log('Error executing postback command:', error)
    }
  }
}