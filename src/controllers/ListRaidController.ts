import {Router, Request, Response, NextFunction} from 'express';
import listRaidService = require('../services/ListRaidService');

class ListRaidController{

    constructor(){

    }

    getListRaidById(req: Request, res: Response, next: NextFunction) : void {
        let id = req.params.id;
        listRaidService.getTrainner(id, res);
    }

}

var listRaidController = new ListRaidController()
export = listRaidController;