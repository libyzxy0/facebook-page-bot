import { Router, Application, Request, Response } from "express";
import webhookController from "@/controllers/webhook.controller";

const router = Router();

router.route("/").get((req: Request, res: Response) => {
  res.json({ message: "Hello, World!!" });
});

router.route("/webhook").get(webhookController.webhook).post(webhookController.handleWebhook);

/* Initialize router */
export const initializeRoutes = (app: Application) =>
  app.use('/', router);