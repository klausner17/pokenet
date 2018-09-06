import { IFindOptions } from 'sequelize-typescript';
import { Router, Request, Response, NextFunction } from 'express';
import * as express from 'express';
import auth from '../middlewares/authentication';
import { Trainer } from '../models/Trainer';
import { TrainnerService } from "../services/trainer";

const trainerRouter: Router = express.Router();
const trainerService = new TrainnerService();

trainerRouter
  .route('/trainner')
  .all(auth.authenticate())
  .get((req: Request, res: Response) => {
    const userId = req.user.id;
    trainerService.getTrainersByUser(userId)
      .then((trainners: Trainer[]) => {
        res.status(200).json(trainners);
      })
      .catch((err) => res.status(412).json({ msg: err.message }));
  })

  .post((req: Request, res: Response) => {
    delete req.body.id;
    req.body.userId = req.user.id;
    trainerService.add(req.body)
      .then((result: Trainer) => res.status(200).json(result))
      .catch((err) => res.status(412).json({ msg: err.message }));
  });

trainerRouter
  .route('/trainner/:id')
  .all(auth.authenticate())
  .get((req: Request, res: Response) => {
    trainerService.get(req.params.id)
      .then((trainner: Trainer) => {
        res.status(200).json(trainner);
      })
      .catch((err) => res.status(412).json({ msg: err.message }));
  })

  .put((req: Request, res: Response) => {
    trainerService.update(req.body, req.user.id)
      .then((result) => res.sendStatus(204))
      .catch((err) => res.status(412).json({ msg: err.message }));
  })

  .delete((req: Request, res: Response) => {
    trainerService.delete(req.params.id, req.user.id)
      .then((result) => res.sendStatus(204))
      .catch((err) => res.status(412).json({ msg: err.message }));
  });

export default trainerRouter;
