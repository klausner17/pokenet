import { Router, Request, Response } from 'express';
import { ListRaid } from './../models/ListRaid';
import * as express from 'express';
import auth from '../middlewares/authentication';


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
        ListRaid.findById(req.params.id)
            .then((listRaid: ListRaid) => {
                res.status(200).json(listRaid);
            })
            .catch(err => res.status(412).json({msg: err.message}));
    });

listRaidRouter.route('/listRaid/:id')
    .all(auth.authenticate())
    .put((req: Request, res: Response) => {
        delete req.body.id;
        ListRaid.update(req.params.id, req.body)
            .then(result => res.sendStatus(204))
            .catch(err => res.status(412).json({msg: err.message}));
    })
    .delete((req: Request, res: Response) => {
        ListRaid.destroy(req.params.id)
            .then(result => res.sendStatus(204))
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

export default listRaidRouter;