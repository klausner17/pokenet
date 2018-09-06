import { Gym } from './../models/Gym';
import { Pokemon } from './../models/Pokemon';
import * as express from 'express';
import { IFindOptions } from 'sequelize-typescript';
import { Router, Request, Response } from 'express';
import auth from '../middlewares/authentication';
import { RaidTrainer } from '../models/RaidTrainer';
import { ListRaid } from '../models/ListRaid';
import { Trainer } from '../models/Trainer';
import { User } from '../models/User';

const listRaidRouter: Router = express.Router();

listRaidRouter.route('/listRaids').get((req: Request, res: Response) => {
  const date = new Date();
  const options: IFindOptions = {
    include: [Pokemon, Gym],
    where: {
      mettingTime: { $gte: date }
    }
  };
  ListRaid.findAll(options)
    .then((listRaids: ListRaid[]) => {
      res.status(200).json(listRaids);
    })
    .catch((err) => res.status(412).json({ msg: err.message }));
});

listRaidRouter.route('/listRaids/:id').get((req: Request, res: Response) => {
  const options: IFindOptions = {
    attributes: ['id', 'maxTrainners', 'timeToClose', 'meetingTime'],
    include: [
      {
        model: Pokemon,
        attributes: ['id', 'name'],
      },
      {
        model: Gym,
        attributes: ['id', 'name', 'alias', 'latitude', 'longitude']
      },
      {
        model: RaidTrainer,
        include: [{
          model: Trainer,
          attributes: ['id', 'name', 'level'],
          include: [{
            model: User,
            attributes: ['id', 'name']
          }]
        }]
      },
      {
        model: User,
        attributes: ['id', 'name']
      }]
  };
  ListRaid.findById(req.params.id, options)
    .then((listRaid: ListRaid) => {
      res.status(200).json(listRaid);
    })
    .catch((err) => res.status(412).json({ msg: err.message }));
});

listRaidRouter
  .route('/listRaid')
  .all(auth.authenticate())
  .post((req: Request, res: Response) => {
    delete req.body.id;
    req.body.userId = req.user.id;
    ListRaid.create(req.body)
      .then((listRaid) => {
        res.status(200).json(listRaid);
      })
      .catch((err) => res.status(412).json({ msg: err.message }));
  });

listRaidRouter
  .route('/listRaid/:id')
  .all(auth.authenticate())
  .put((req: Request, res: Response) => {
    delete req.body.id;
    ListRaid.update(req.body, {
      where: { id: req.params.id, userId: req.user.id }
    })
      .then((result) => res.sendStatus(204))
      .catch((err) => res.status(412).json({ msg: err.message }));
  })
  .delete((req: Request, res: Response) => {
    ListRaid.destroy({ where: { id: req.params.id, userId: req.user.id } })
      .then((result) => res.sendStatus(204))
      .catch((err) => res.status(412).json({ msg: err.message }));
  });

listRaidRouter
  .route('/listRaid/:id/trainner/:idTrainner')
  .all(auth.authenticate())
  .post((req: Request, res: Response) => {
    const userId: number = req.user.id;
    const trainnerId: number = req.params.idTrainner;
    const options: IFindOptions = {
      include: [{
        model: User,
        attributes: ['id', 'name']
      }],
      where: {
        userId: userId,
        id: trainnerId
      }
    };
    Trainer.findOne(options).then(
      (result) => {
        if (result) {
          const raidTrainner: RaidTrainer = new RaidTrainer();
          raidTrainner.trainnerId = +trainnerId;
          raidTrainner.raidId = +req.params.id;
          raidTrainner
            .save()
            .then((trainner: RaidTrainer) => {
              res.status(200).json(trainner);
            })
            .catch((error: Error) => {
              res.status(412).json({ msg: error.message });
            });
        } else {
          res.sendStatus(401);
        }
      }
    );
  })
  .delete((req: Request, res: Response) => {
    const userId: number = req.user.id;
    const trainnerId: number = req.params.idTrainner;
    const options: IFindOptions = {
      where: { userId: userId, id: trainnerId }
    };
    Trainer.findOne(options)
      .then((result: Trainer) => {
        if (result) {
          RaidTrainer.destroy({
            where: { raidId: req.params.id, trainnerId: trainnerId }
          })
            .then(() => {
              res.sendStatus(204);
            })
            .catch((error: Error) => {
              res.status(412).json({ msg: error.message });
            });
        } else {
          res.sendStatus(401);
        }
      }
      );
  });

export default listRaidRouter;
