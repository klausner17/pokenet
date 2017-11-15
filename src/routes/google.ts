import { Router, Request, Response } from 'express';
import * as express from 'express';
import * as passport from 'passport';
import auth from '../middlewares/authentication';
import * as jwt from 'jwt-simple';
const config: any = require("../config.json").auth;



var googleRouter: Router = express.Router();

googleRouter.route('/auth/google')
    .get(passport.authenticate('google', {scope: ['profile', 'email']}));

googleRouter.route('/auth/google/callback')
    .get(passport.authenticate('google' ,{
        // successRedirect: '/google/success',
        failureRedirect: '/google/failure',
        session: false
    }),
    (req: Request, res: Response) => {
        let token = jwt.encode(req.user, config.secretKey);
        res.status(200).json({token: token});
    });

googleRouter.get('/google/failure', (req: Request, res: Response) => {
    res.sendStatus(401);
})

export default googleRouter;