import { Router, Request, Response, NextFunction } from "express";
import * as express from "express";
import { User } from "../models/User";

var userRoutes: Router = express.Router();

userRoutes
  .route("/user")
  .all((req: Request, res: Response, next) => {
    delete req.body.id;
  })
  .get((req: Request, res: Response, next) => {
    User.create(req.body)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
          res.status(402).json({msg: "internal error"});
      });
  });

export default userRoutes;
