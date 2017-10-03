import {Response} from 'express';

export abstract class Service{
    
    validateResults(err: any, result: any, res: Response, callback: Function){
        if (err){
            res.status(400).json({message: "Error to process request. Error: " + err});
        }else if (!result){
            res.status(404).json({message: "Resource not found"});
        }else{
            callback();
        }
    }
}