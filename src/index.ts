import express from "express";
import { setupApp } from "./setup-app";

export const app = express();
setupApp(app);

const PORT = process.env.PORT || 5001;

// Only start the server if not in Vercel serverless environment
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel serverless functions
export default app;
