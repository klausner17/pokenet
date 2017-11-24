import { Router, Request, Response } from "express";
import * as express from "express";
import { User } from "../models/User";
import * as jwt from "jwt-simple";
const config: any = require("../config.json").auth;

var tokenRouter: Router = express.Router();

tokenRouter.post("/token", (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    let email: string = req.body.email;
    let pass: string = req.body.password;
    User.findOne({ where: { email: email } })
      .then((user: User) => {
        if (user.verifyPassword(pass)) {
          let payload: {} = { id: user.id };
          res
            .status(200)
            .json({ token: jwt.encode(payload, config.secretKey) });
        } else {
          res.sendStatus(401);
        }
      })
      .catch(error => res.sendStatus(401));
  } else {
    res.sendStatus(401);
  }
});

export default tokenRouter;
