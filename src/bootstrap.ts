import "dotenv/config";
import { Application } from "express";

/**
 * Initializes the application
 * @param app - The express "Application"
 */

const Bootstrap = async (app: Application) => {
  const PORT: number = parseInt(`${process.env.PORT}`, 10) || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
  });
};

export default Bootstrap;
