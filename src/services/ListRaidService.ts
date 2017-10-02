import listRaidSchema = require('../schemas/ListRaidSchema');
import * as mongoose from 'mongoose';
import {Response} from 'express';


class ListRaidService{
    
    getTrainner(id: any , res: Response) : void {
        listRaidSchema.findById(id, (err, result) => {
            if (err) res.status(400).json({message: "Ocorreu um erro: " + err})
            else{
                res.status(200).json({message: "vai ter q ser assim"});
            }
        });
    }
}

var listRaidService = new ListRaidService();
export = listRaidService;