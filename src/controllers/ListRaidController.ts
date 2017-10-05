import {Router, Request, Response, NextFunction} from 'express';
import listRaidService = require('../services/ListRaidService');
import ITrainner = require('../models/ITrainner');
import IListRaid = require('../models/IListRaid');

class ListRaidController{

    constructor(){

    }

    getListRaidById(req: Request, res: Response, next: NextFunction) : void {
        let id = req.params.id;
        listRaidService.getListRaid(id, res);
    }

    createListRaid(req: Request, res: Response, next: NextFunction) : void {
        let listRaid : {};
        listRaid = req.body.listRaid;
        listRaidService.createListRaid(listRaid, res);
    }

    insertTrainner(req: Request, res: Response, next: NextFunction) :void {
        let trainner = {
            name: req.body.name,
            level: req.body.level
        };
        let listRaidId = req.params.id;
        listRaidService.insertTrainnerListRaid(listRaidId, trainner, res);
    }

}

var listRaidController = new ListRaidController()
export = listRaidController;