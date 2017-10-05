import listRaidSchema = require('../schemas/ListRaidSchema');
import * as mongoose from 'mongoose';
import {Response} from 'express';
import {Service} from './Service';
import ITrainner = require('../models/ITrainner');
import IListRaid = require('../models/IListRaid');

class ListRaidService extends Service{
    
    getListRaid(id: any , res: Response) : void {
        listRaidSchema.findById(id, (err, result) => {
            this.validateResults(err, result, res, () => {
                res.status(200).json(result);
            });
        });
    }

    createListRaid(listRaid: {}, res: Response) : void {
        listRaidSchema.create(listRaid, (err, result) => {
            this.validateResults(err, result, res, () =>{
                res.status(200).json(result);
            });
        });
    }

    insertTrainnerListRaid(listRaidId: any, trainner: ITrainner, res: Response) : void {
        listRaidSchema.findById (listRaidId, (err, result) => {
            this.validateResults(err, result, res, () => {
                //Verifica se já existe esse trainner na lista
                let found : boolean = false;
                result.trainners.forEach(element => {
                    found = element.name == trainner.name;
                });
                //Se não existir, adiciona o treinador.
                if (!found){
                    result.trainners.push(trainner);
                    result.update(result, (err, raw) => {
                        res.status(200).json({message: "ListRaid updated."});
                    });
                }else{
                    res.status(400).json({message: "Trainner already registred in ListRaid."})
                };
            });
        });
    }
}

var listRaidService = new ListRaidService();
export = listRaidService;