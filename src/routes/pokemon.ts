import { Pokemon } from './../models/Pokemon';
import { Router, Request, Response } from 'express';
import * as express from 'express';

var pokemonRouter: Router = express.Router();

pokemonRouter.route('/pokemon')
    .get((req: Request, res:Response) => {
        Pokemon.findAll()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error=> {
                res.status(412).json({msg: error.message});
            })
    });

pokemonRouter.route('/pokemonGym/:id')
    .get((req: Request, res:Response) => {
        Pokemon.findAll({where: {id: req.params.id}})
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error=> {
                res.status(412).json({msg: error.message});
            })
    });

export default pokemonRouter;
