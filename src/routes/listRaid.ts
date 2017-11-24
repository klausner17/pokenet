import * as express from "express";
import { IFindOptions } from "sequelize-typescript";
import { Router, Request, Response } from "express";

import auth from "../middlewares/authentication";

import { PokemonGym } from "../models/PokemonGym";
import { RaidTrainners } from "../models/RaidTrainners";
import { Gym } from "../models/Gym";
import { ListRaid } from "../models/ListRaid";
import { Trainner } from "./../models/Trainner";
import { Pokemon } from "../models/Pokemon";

var listRaidRouter: Router = express.Router();

listRaidRouter.route("/listRaids").get((req: Request, res: Response) => {
  ListRaid.findAll()
    .then((listRaids: ListRaid[]) => {
      res.status(200).json(listRaids);
    })
    .catch(err => res.status(412).json({ msg: err.message }));
});

listRaidRouter.route("/listRaids/:id").get((req: Request, res: Response) => {
  let options: IFindOptions = {
    include: [
      {
        model: PokemonGym,
        include: [
          {
            model: Pokemon
          }
        ]
      },
      {
        model: Gym
      },
      {
        model: RaidTrainners,
        include: [
          {
            model: Trainner
          }
        ]
      }
    ]
  };
  ListRaid.findById(req.params.id, options)
    .then((listRaid: ListRaid) => {
      res.status(200).json(listRaid);
    })
    .catch(err => res.status(412).json({ msg: err.message }));
});

listRaidRouter
  .route("/listRaid")
  .all(auth.authenticate())
  .post((req: Request, res: Response) => {
    delete req.body.id;
    req.body.userId = req.user.id;
    ListRaid.create(req.body)
      .then(listRaid => {
        res.status(200).json(listRaid);
      })
      .catch(err => res.status(412).json({ msg: err.message }));
  });

listRaidRouter
  .route("/listRaid/:id")
  .all(auth.authenticate())
  .put((req: Request, res: Response) => {
    delete req.body.id;
    ListRaid.update(req.body, {
      where: { id: req.params.id, userId: req.user.id }
    })
      .then(result => res.sendStatus(204))
      .catch(err => res.status(412).json({ msg: err.message }));
  })
  .delete((req: Request, res: Response) => {
    ListRaid.destroy({ where: { id: req.params.id, userId: req.user.id } })
      .then(result => res.sendStatus(204))
      .catch(err => res.status(412).json({ msg: err.message }));
  });

listRaidRouter
  .route("/listRaid/:id/trainner/:idTrainner")
  .all(auth.authenticate())
  .put((req: Request, res: Response) => {
    const userId: number = req.user.id;
    const trainnerId: number = req.params.idTrainner;
    Trainner.findOne({ where: { userId: userId, id: trainnerId } }).then(
      result => {
        console.log(result);
        if (result) {
          const raidTrainner: RaidTrainners = new RaidTrainners();
          raidTrainner.trainnerId = trainnerId;
          raidTrainner.raidId = req.params.id;
          raidTrainner
            .save()
            .then((raidTrainner: RaidTrainners) => {
              res.status(200).json(raidTrainner);
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
    Trainner.findOne({ where: { userId: userId, id: trainnerId } }).then(
      result => {
        if (result) {
          Trainner.findOne({ where: { userId: userId, id: trainnerId } });
          RaidTrainners.destroy({
            where: { raidId: req.params.id, trainnerId: req.user.id }
          })
            .then((result: number) => {
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
