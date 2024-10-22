import { Request, Response } from "express";

const notFound = (_req: Request, res: Response) => {
  res.status(404).json({ code: 404, error: "404 route not found" });
};

export default notFound;
