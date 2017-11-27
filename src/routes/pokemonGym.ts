import { IFindOptions } from 'sequelize-typescript';
import { PokemonGym } from "../models/PokemonGym";
import { Router, Request, Response } from "express";
import * as express from "express";
import { Pokemon } from '../models/Pokemon';
import { Gym } from '../models/Gym';

var pokemonGymRouter: Router = express.Router();

pokemonGymRouter.route("/pokemonGym").get((req: Request, res: Response) => {
  const options: IFindOptions = {
    attributes: ['id', 'pokemonId', 'combatPower'],
    include: [{
      attributes: ['id','name'],
      model: Pokemon
    }]
  };
  PokemonGym.findAll(options)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(412).json({ msg: error.message });
    });
});

pokemonGymRouter.route("/pokemonGym/:id").get((req: Request, res: Response) => {
  PokemonGym.findAll({ where: { id: req.params.id } })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(412).json({ msg: error.message });
    });
});

export default pokemonGymRouter;
