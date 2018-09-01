import { Router, Request, Response } from 'express';
import * as express from 'express';
import { PokemonService } from "../services/pokemon";

const pokemonService = new PokemonService();
const pokemonRouter: Router = express.Router();

pokemonRouter.route('/pokemon')
  .get((req: Request, res: Response) => {
    pokemonService.allPokemons()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  });

pokemonRouter.route('/pokemon/raid')
  .get((req: Request, res: Response) => {
    pokemonService.getAllActiveRaid()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(412).json({ msg: error.message })
      })
  })

pokemonRouter.route('/pokemon/:id')
  .get((req: Request, res: Response) => {
    pokemonService.findById(req.params.id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  });

export default pokemonRouter;
