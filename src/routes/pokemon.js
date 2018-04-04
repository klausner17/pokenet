import { Pokemon } from './../models/Pokemon';
import * as express from 'express';
const pokemonRouter = express.Router();
pokemonRouter.route('/pokemon').get((req, res) => {
    Pokemon.findAll()
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((error) => {
        res.status(412).json({ msg: error.message });
    });
});
pokemonRouter.route('/pokemonGym/:id').get((req, res) => {
    Pokemon.findAll({ where: { id: req.params.id } })
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((error) => {
        res.status(412).json({ msg: error.message });
    });
});
export default pokemonRouter;
