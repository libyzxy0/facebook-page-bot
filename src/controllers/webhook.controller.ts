import {
  Request,
  Response
} from "express";
import { PAGE_ACCESS_TOKEN, VERIFY_TOKEN } from '@/credentials'
import { handlePostback } from '@/handlers/postback.handler'
import { handleMessage } from '@/handlers/message.handler'

class WebhookController {
  constructor() {}

  async webhook(req: Request, res: Response) {
    try {
      const mode = req.query['hub.mode']
      const token = req.query['hub.verify_token']
      const challenge = req.query['hub.challenge']

      if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
          console.log('WEBHOOK_VERIFIED');
          res.status(200).send(challenge);
        } else {
          res.sendStatus(403);
        }
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        error: "Something went wrong"
      })
    }
  }
  async handleWebhook(req: Request, res: Response) {
    try {
      const body = req.body;

      if (body.object === 'page') {
        body.entry.forEach(entry => {
          entry.messaging.forEach(event => {
            if (event.message) {
              handleMessage(event);
            } else if (event.postback) {
              handlePostback(event);
            }
          });
        });

        res.status(200).send('EVENT_RECEIVED');
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        error: "Something went wrong"
      })
    }
  }
}

export default new WebhookController();