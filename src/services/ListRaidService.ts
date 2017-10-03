import listRaidSchema = require('../schemas/ListRaidSchema');
import * as mongoose from 'mongoose';
import {Response} from 'express';
import {Service} from './Service';

class ListRaidService extends Service{
    
    getListRaid(id: any , res: Response) : void {
        listRaidSchema.findById(id, (err, result) => {
            this.validateResults(err, result, res, () => {
                res.status(200).json(result);
            });
        });
    }

    createListRaid(listRaid: JSON, res: Response) : void {
        listRaidSchema.create(listRaid, (err, result) => {
            this.validateResults(err, result, res, () =>{
                res.status(200).json(result);
            });
        });
    }
}

var listRaidService = new ListRaidService();
export = listRaidService;