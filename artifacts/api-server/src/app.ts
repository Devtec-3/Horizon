import express, { type Express } from "express";
import cors from "cors";
import { IncomingMessage, ServerResponse } from "http"; // Required for serializer types
import pinoHttp = require('pino-http'); // Using require syntax for robust ESM/CJS interop

import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      // Explicitly typing req as IncomingMessage
      req(req: IncomingMessage) {
        return {
          id: (req as any).id, // Casting to any because 'id' is a custom property added by pino-http
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      // Explicitly typing res as ServerResponse
      res(res: ServerResponse) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
