import {Router, Request, Response, NextFunction} from 'express';
import listRaidController = require('../controllers/ListRaidController');

class ListRouter{

    router: Router;

    constructor(){
        this.router = Router();
        this.init();
    }

    init() : void {
        this.router.get('/:id', listRaidController.getListRaidById);
    }
}

const listRouter = new ListRouter();

export default listRouter.router;