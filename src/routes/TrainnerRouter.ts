import {Router, Request, Response, NextFunction} from 'express';

class TrainnerRouter{
    router: Router;

    constructor(){
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, next: NextFunction) : void {
        res.send(res.status(200).json({message: "Todos os heroies"}));
    }

    init(){
        this.router.get('/', this.getAll);
    }
}

const trainnerRouter = new TrainnerRouter();
export default trainnerRouter.router;