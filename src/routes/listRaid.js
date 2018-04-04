import * as express from 'express';
import auth from '../middlewares/authentication';
import { PokemonGym } from '../models/PokemonGym';
import { RaidTrainners } from '../models/RaidTrainners';
import { Gym } from '../models/Gym';
import { ListRaid } from '../models/ListRaid';
import { Trainner } from './../models/Trainner';
import { Pokemon } from '../models/Pokemon';
import { User } from '../models/User';
const listRaidRouter = express.Router();
listRaidRouter.route('/listRaids').get((req, res) => {
    const date = new Date();
    const options = {
        include: [{
                model: PokemonGym,
                include: [{
                        model: Pokemon }]
            }, {
                model: Gym
            }],
        where: { meetingTime: { gte: date } }
    };
    ListRaid.findAll(options)
        .then((listRaids) => {
        res.status(200).json(listRaids);
    })
        .catch((err) => res.status(412).json({ msg: err.message }));
});
listRaidRouter.route('/listRaids/:id').get((req, res) => {
    const options = {
        attributes: ['id', 'maxTrainners', 'timeToClose', 'meetingTime'],
        include: [
            {
                model: PokemonGym,
                attributes: ['id', 'combatPower'],
                include: [{
                        attributes: ['id', 'name'],
                        model: Pokemon
                    }]
            },
            {
                model: Gym,
                attributes: ['id', 'name', 'alias', 'latitude', 'longitude']
            },
            {
                model: RaidTrainners,
                include: [{
                        model: Trainner,
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
        .then((listRaid) => {
        res.status(200).json(listRaid);
    })
        .catch((err) => res.status(412).json({ msg: err.message }));
});
listRaidRouter
    .route('/listRaid')
    .all(auth.authenticate())
    .post((req, res) => {
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
    .put((req, res) => {
    delete req.body.id;
    ListRaid.update(req.body, {
        where: { id: req.params.id, userId: req.user.id }
    })
        .then((result) => res.sendStatus(204))
        .catch((err) => res.status(412).json({ msg: err.message }));
})
    .delete((req, res) => {
    ListRaid.destroy({ where: { id: req.params.id, userId: req.user.id } })
        .then((result) => res.sendStatus(204))
        .catch((err) => res.status(412).json({ msg: err.message }));
});
listRaidRouter
    .route('/listRaid/:id/trainner/:idTrainner')
    .all(auth.authenticate())
    .post((req, res) => {
    const userId = req.user.id;
    const trainnerId = req.params.idTrainner;
    Trainner.findOne({ where: { userId: userId, id: trainnerId } }).then((result) => {
        if (result) {
            const raidTrainner = new RaidTrainners();
            raidTrainner.trainnerId = trainnerId;
            raidTrainner.raidId = req.params.id;
            raidTrainner
                .save()
                .then((trainner) => {
                res.status(200).json(trainner);
            })
                .catch((error) => {
                res.status(412).json({ msg: error.message });
            });
        }
        else {
            res.sendStatus(401);
        }
    });
})
    .delete((req, res) => {
    const userId = req.user.id;
    const trainnerId = req.params.idTrainner;
    const options = {
        where: { userId: userId, id: trainnerId }
    };
    Trainner.findOne(options)
        .then((result) => {
        if (result) {
            RaidTrainners.destroy({
                where: { raidId: req.params.id, trainnerId: trainnerId }
            })
                .then(() => {
                res.sendStatus(204);
            })
                .catch((error) => {
                res.status(412).json({ msg: error.message });
            });
        }
        else {
            res.sendStatus(401);
        }
    });
});
export default listRaidRouter;
