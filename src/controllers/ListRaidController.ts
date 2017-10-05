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
        // listRaid.gym = req.body.gym;
        // listRaid.pokemon = req.body.pokemon;
        // listRaid.timeToClose = req.body.timeToClose;
        // listRaid.meetingTime = req.body.meetingTime;
        // listRaid.maxTrainners = req.body.maxTrainners;
        listRaidService.createListRaid(listRaid, res);
    }

    insertTrainner(req: Request, res: Response, next: NextFunction) :void {
        let trainner: ITrainner;
        trainner = req.body.trainner;
        let listRaidId = req.params.id;
        listRaidService.insertTrainnerListRaid(listRaidId, trainner, res);
    }

}

var listRaidController = new ListRaidController()
export = listRaidController;