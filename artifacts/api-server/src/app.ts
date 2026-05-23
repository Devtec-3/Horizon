import express, { type Express } from "express";
import cors from "cors";
import { IncomingMessage, ServerResponse } from "http";
// Using 'import = require' is the most robust way to handle pino-http in Vercel
import pinoHttp = require('pino-http'); 

import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      // Typing req as IncomingMessage is required by strict mode
      req(req: IncomingMessage) {
        return {
          // Casting to 'any' is necessary here because pino-http 
          // attaches a custom 'id' property to the request object.
          id: (req as any).id, 
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      // Typing res as ServerResponse
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
