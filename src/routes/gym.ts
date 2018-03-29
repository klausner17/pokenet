import { Gym } from '../models/Gym';
import { Router, Request, Response } from 'express';
import * as express from 'express';

const gymRouter: Router = express.Router();

gymRouter.route('/gym').get((req: Request, res: Response) => {
  Gym.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(412).json({ msg: error.message });
    });
});

gymRouter.route('/pokemonGym/:id').get((req: Request, res: Response) => {
  Gym.findAll({ where: { id: req.params.id } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(412).json({ msg: error.message });
    });
});

export default gymRouter;
