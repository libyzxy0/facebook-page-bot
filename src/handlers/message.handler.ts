import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { listenKeiAI } from '@/DefaultAI'
import {
  PAGE_ACCESS_TOKEN
} from '@/credentials'

export const setTypingIndicator = async (senderId, isTyping) => {
  const url = `https://graph.facebook.com/v13.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;

  const payload = {
    recipient: {
      id: senderId,
    },
    sender_action: isTyping ? 'typing_on' : 'typing_off',
  };

  try {
    await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error sending typing indicator:', error.response.data);
  }
};

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

const apiFunctions = {
  setTypingIndicator, 
  sendMessage
}

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
        execute({
          event: event, 
          api: apiFunctions
        });
      } catch (error) {
        if (error.code == "ERR_MODULE_NOT_FOUND") {
          const api = apiFunctions;
          listenKeiAI(event.message.text, event.sender.id, api, event);
        } else {
          sendMessage({ text: "Failed to execute command, something went wrong." })
        }
      }
    }
  }