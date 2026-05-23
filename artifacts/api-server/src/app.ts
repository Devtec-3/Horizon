import express, { type Express } from "express";
import cors from "cors";
// Standard import now works because we told TS to ignore the types in our .d.ts file
import pinoHttp from 'pino-http'; 

import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: any) { // Use 'any' here as well to be safe
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) { // Use 'any' here as well to be safe
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
