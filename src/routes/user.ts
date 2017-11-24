import { Router, Request, Response, NextFunction } from "express";
import * as express from "express";
import { User } from "../models/User";
import auth from "../middlewares/authentication";

var userRoutes: Router = express.Router();

userRoutes
  .route("/users")
  .all((req: Request, res: Response, next: NextFunction) => {
    delete req.body.id;
    next();
  })
  .post((req: Request, res: Response, next) => {
    User.create(req.body)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(402).json({ msg: "internal error" });
      });
  });

userRoutes
  .route("/user")
  .all(auth.authenticate())
  .get((req: Request, res: Response) => {
    User.findById(req.user.id, { attributes: ["id", "name", "email"] })
      .then((user: User) => res.status(200).json(user))
      .catch(error => res.status(412).json({ msg: error.message }));
  })
  .delete((req: Request, res: Response) => {
    User.destroy({ where: { id: req.user.id } })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  })
  .put((req: Request, res: Response) => {
    User.update(req.body, { where: { id: req.user.id } })
      .then(result => res.sendStatus(204))
      .catch(err => res.status(412).json({ msg: err.message }));
  });

export default userRoutes;
