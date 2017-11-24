import { Router, Response, Request, IRoute } from "express";
import * as express from "express";

var indexRoutes: Router = express.Router();

indexRoutes.route("/").get((req: Request, res: Response) => {
  res.status(200).json({ status: "Hello world - Pokenet API" });
});

export default indexRoutes;
