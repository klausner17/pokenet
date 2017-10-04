import {Router, Request, Response, NextFunction} from 'express';
import listRaidService = require('../services/ListRaidService');

class ListRaidController{

    constructor(){

    }

    getListRaidById(req: Request, res: Response, next: NextFunction) : void {
        let id = req.params.id;
        listRaidService.getListRaid(id, res);
    }

    createListRaid(req: Request, res: Response, next: NextFunction) : void {
        let listRaid : {}
        listRaid = {
            pokemonGym: req.body.pokemonGym,
            meetingTime: req.body.meetingTime,
            maxTrainners: req.body.maxTrainners,
        }
        listRaidService.createListRaid(listRaid, res);
    }

    insertTrainner(req: Request, res: Response, next: NextFunction) :void {
        let trainnerId = req.body.trainnerId;
        let listRaidId = req.params.id;
        listRaidService.insertTrainnerListRaid(listRaidId, trainnerId, res);
    }

}

var listRaidController = new ListRaidController()
export = listRaidController;