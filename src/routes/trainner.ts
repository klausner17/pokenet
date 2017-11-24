import { User } from "./../models/User";
import { Router, Request, Response, NextFunction } from "express";
import * as express from "express";
import auth from "../middlewares/authentication";
import { Trainner } from "../models/Trainner";

var trainnerRouter: Router = express.Router();

trainnerRouter
  .route("/trainner")
  .all(auth.authenticate())
  .get((req: Request, res: Response) => {
    Trainner.findAll({ where: { userId: req.user.id } })
      .then((trainners: Trainner[]) => {
        res.status(200).json(trainners);
      })
      .catch(err => res.status(412).json({ msg: err.message }));
  })
  .post((req: Request, res: Response) => {
    delete req.body.id;
    req.body.userId = req.user.id;
    Trainner.create(req.body)
      .then((result: Trainner) => res.status(200).json(result))
      .catch(err => res.status(412).json({ msg: err.message }));
  });

trainnerRouter
  .route("/trainner/:id")
  .all(auth.authenticate())
  .get((req: Request, res: Response) => {
    Trainner.findOne({ where: { id: req.params.id, userId: req.user.id } })
      .then((trainner: Trainner) => {
        res.status(200).json(trainner);
      })
      .catch(err => res.status(412).json({ msg: err.message }));
  })
  .put((req: Request, res: Response) => {
    Trainner.update(req.body, {
      where: { id: req.params.id, userId: req.user.id }
    })
      .then(result => res.sendStatus(204))
      .catch(err => res.status(412).json({ msg: err.message }));
  })
  .delete((req: Request, res: Response) => {
    Trainner.destroy({ where: { id: req.params.id, userId: req.user.id } })
      .then(result => res.sendStatus(204))
      .catch(err => res.status(412).json({ msg: err.message }));
  });

export default trainnerRouter;
