import "reflect-metadata";
import { connect } from "../server/orm";
import express from "express";
import next from "next";
import { IndexRoute } from "./routes";
import { createServer } from "http";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const appNext = next({ dev });
const appExpress = express();
const server = createServer(appExpress);
const handle = appNext.getRequestHandler();

connect().then(([err, connection]) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Connected to database");
});

appNext.prepare().then(() => {
  appExpress.use(express.json());
  appExpress.use(express.urlencoded({ extended: true }));

  new IndexRoute(appExpress);
  
  appExpress.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
