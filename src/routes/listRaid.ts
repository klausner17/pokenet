import { Trainner } from './../models/Trainner';
import { Router, Request, Response } from 'express';
import { ListRaid } from './../models/ListRaid';
import * as express from 'express';
import auth from '../middlewares/authentication';
import { Pokemon } from '../models/Pokemon';
import { IFindOptions } from 'sequelize-typescript';
import { PokemonGym } from '../models/PokemonGym';
import { RaidTrainners } from '../models/RaidTrainners';


var listRaidRouter: Router = express.Router();

listRaidRouter.route('/listRaids')
    .get((req: Request, res: Response) => {
        ListRaid.findAll()
            .then((listRaids: ListRaid[]) => {
                res.status(200).json(listRaids);
            })
            .catch(err => res.status(412).json({msg: err.message}));
    });

listRaidRouter.route('/listRaids/:id')
    .get((req: Request, res: Response) => {
        let options: IFindOptions = { 
            include: [{
                model: PokemonGym,
                include: [{
                    model: Pokemon
                }]
            }, {
                model: RaidTrainners,
                include: [{
                    model: Trainner
                }]
            }]
        }
        ListRaid.findById(req.params.id, options)
            .then((listRaid: ListRaid) => {
                res.status(200).json(listRaid);
            })
            .catch(err => res.status(412).json({msg: err.message}));
    });

listRaidRouter.route('/listRaid')
    .all(auth.authenticate())
    .post((req: Request, res: Response) => {
        delete req.body.id;
        req.body.userId = req.user.id;
        ListRaid.create(req.body)
            .then(listRaid => {
                res.status(200).json(listRaid);
            })
            .catch(err => res.status(412).json({msg: err.message}));
    });

listRaidRouter.route('/listRaid/:id')
    .all(auth.authenticate())
    .put((req: Request, res: Response) => {
        delete req.body.id;
        ListRaid.update(req.body, {where: {id: req.params.id, userId: req.user.id}})
            .then(result => res.sendStatus(204))
            .catch(err => res.status(412).json({msg: err.message}));
    })
    .delete((req: Request, res: Response) => {
        ListRaid.destroy({where: {id: req.params.id, userId: req.user.id}})
            .then(result => res.sendStatus(204))
            .catch(err => res.status(412).json({msg: err.message}));
    });

export default listRaidRouter;