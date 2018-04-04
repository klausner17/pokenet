import { PokemonGym } from '../models/PokemonGym';
import * as express from 'express';
import { Pokemon } from '../models/Pokemon';
const pokemonGymRouter = express.Router();
pokemonGymRouter.route('/pokemonGym').get((req, res) => {
    const options = {
        attributes: ['id', 'pokemonId', 'combatPower'],
        include: [{
                attributes: ['id', 'name'],
                model: Pokemon
            }]
    };
    PokemonGym.findAll(options)
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((error) => {
        res.status(412).json({ msg: error.message });
    });
});
pokemonGymRouter.route('/pokemonGym/:id').get((req, res) => {
    PokemonGym.findAll({ where: { id: req.params.id } })
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((error) => {
        res.status(412).json({ msg: error.message });
    });
});
export default pokemonGymRouter;
