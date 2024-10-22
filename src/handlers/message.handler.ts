import fs from 'fs';
import path from 'path';
import axios from 'axios';

import {
  PAGE_ACCESS_TOKEN
} from '@/credentials'

export async function sendMessage(message, senderId) {
  if (!message || (!message.text && !message.attachment)) {
    console.error('Provide valid text or attachment.');
    return;
  }

  const payload = {
    recipient: {
      id: senderId
    },
    message: {}
  };

  if (message.text) {
    payload.message.text = message.text;
  }

  if (message.attachment) {
    payload.message.attachment = message.attachment;
  }

  try {
    const response = await axios.post(`https://graph.facebook.com/v13.0/me/messages`, payload, {
      params: {
        access_token: PAGE_ACCESS_TOKEN
      }
    });
    console.log('Message sent successfully:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data.error);
    } else {
      console.error('Error sending message:', error.message);
    }
    return null;
  }
}

export async function handleMessage(event) {
  const senderId = event.sender.id;
  const messageText = event.message.text.toLowerCase();

  const args = messageText.split(' ');
  const commandName = args.shift();

  console.log(commandName)
  if (commandName) {
    try {
      let {
        execute
      } = await import(`../commands/${commandName}`);
        execute({
          event: event, 
          api: {
            sendMessage
          }
        });
      } catch (error) {
        console.error(`Error executing command ${commandName}:`, error);
        await sendMessage( {
          text: 'There was an error executing that command.'
        }, senderId);
      }
    }
  }