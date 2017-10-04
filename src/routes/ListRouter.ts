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
        this.router.post('/', listRaidController.createListRaid);
        this.router.put('/addTrainner/:id', listRaidController.insertTrainner);
    }
}

const listRouter = new ListRouter();

export default listRouter.router;