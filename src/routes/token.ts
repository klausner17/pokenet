import { Router, Request, Response } from 'express';
import * as express from 'express';
import { User } from '../models/User';
import * as jwt from 'jwt-simple';

// tslint:disable-next-line:no-var-requires
const config: any = require('../config');

const tokenRouter: Router = express.Router();

tokenRouter.post('/token', (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    const email: string = req.body.email;
    const pass: string = req.body.password;
    User.findOne({ where: { email: email } })
      .then((user: User) => {
        if (user.verifyPassword(pass)) {
          const payload: {} = { id: user.id };
          res
            .status(200)
            .json({ token: jwt.encode(payload, config.auth.secretKey) });
        } else {
          res.sendStatus(401);
        }
      })
      .catch((error) => res.sendStatus(401));
  } else {
    res.sendStatus(401);
  }
});

export default tokenRouter;
