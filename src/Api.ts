import {
  PAGE_ACCESS_TOKEN
} from '@/credentials'
import axios from 'axios';

interface Message {
  id: string;
  created_time: string;
  from: {
    username: string;
    id: string;
  };
  message: string;
}

export class API {
  constructor() {
    this.baseUrl = "https://graph.facebook.com/v13.0";
  }

  async getUserConversation(userId: string): Promise<Message[]> {
    try {
      const conversationResponse = await axios.get(`${this.baseUrl}/me/conversations`, {
        params: {
          user_id: userId,
          access_token: PAGE_ACCESS_TOKEN,
        },
      });

      const conversationId = conversationResponse.data?.data?.[0]?.id;
      if (!conversationId) {
        throw new Error("No conversation found for the given user.");
      }
      const messagesResponse = await axios.get(`${this.baseUrl}/${conversationId}`, {
        params: {
          fields: 'messages.limit(5)',
          access_token: PAGE_ACCESS_TOKEN,
        },
      });

      const messages = messagesResponse.data?.messages?.data || [];
      const detailedMessages = await Promise.all(
        messages.map(async (msg: { id: string }) => {
          const messageDetailsResponse = await axios.get(`${this.baseUrl}/${msg.id}`, {
            params: {
              fields: 'id,created_time,from,message',
              access_token: PAGE_ACCESS_TOKEN,
            },
          });
          return messageDetailsResponse.data as Message;
        })
      );

      return detailedMessages;
    } catch (error) {
      console.error('Error fetching user conversation:', error.message);
      return [];
    }
  }

  async getUserInfo(id: string): Promise < any > {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`, {
      params: {
        access_token: PAGE_ACCESS_TOKEN,
      },
    })
    return response.data;
    } catch (error) {
      return { first_name: "N/A", last_name: "N/A" }
    }
  }
  
  async getCurrentUserId() {
    try {
      const response = await axios.get(`${this.baseUrl}/me?fields=id`, {
      params: {
        access_token: PAGE_ACCESS_TOKEN,
      },
      })
      return response.data;
    } catch (error) {
      throw new Error("Failed to get current page id, Error: " + error.message)
    }
  }

  async setTypingIndicator(senderId: string, isTyping: boolean) {
    const url = `${this.baseUrl}/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;

    const payload = {
      recipient: {
        id: senderId,
      },
      sender_action: isTyping ? 'typing_on': 'typing_off',
    };

    try {
      await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw new Error("Error sending typing indicator: " + error.message)
    }
  }

  async sendMessage(message: any, senderId: string) {
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
      const response = await axios.post(`${this.baseUrl}/me/messages`, payload, {
        params: {
          access_token: PAGE_ACCESS_TOKEN
        }
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data)
      throw new Error("Failed to send message, Error: " + error)
    }
  }

}
