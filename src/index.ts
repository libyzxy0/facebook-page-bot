import express, {
  Application, 
  Request,
  Response
} from "express";
import Bootstrap from "@/bootstrap";
import errorHandler from "@/middlewares/error-handler";
import notFound from "@/middlewares/not-found";
import cors from "cors";
import { PAGE_ACCESS_TOKEN, VERIFY_TOKEN } from '@/credentials'
import { handlePostback } from '@/handlers/postback.handler'
import { handleMessage } from '@/handlers/message.handler'
import { fontText } from '@/utils/fonts'
import {
  API
} from '@/Api'

const botAPI = new API();

const app: Application = express();

/* Middlewares */
app.use(errorHandler);

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cors());

/* Initialize express Application */
Bootstrap(app);

/* Initialize routes */
app.get("/webhook", async (req: Request, res: Response) => {
  try {
    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('Congrats, your webhook is verified!');
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
})

app.post("/webhook", (req: Request, res: Response) => {
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
})

app.post("/railway/webhook", (req: Request, res: Response) => {
  try {
     botAPI.sendMessage({
       text: `${fontText("Deployment Alert!!", "bold")}\n\n${JSON.stringify(req.body, null, 2) + '\n'}`
     }, "8232207860235773")

     res.status(200).send('EVENT_RECEIVED');
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Something went wrong"
    })
  }
})

/* Handle 404 */
app.use(notFound);
