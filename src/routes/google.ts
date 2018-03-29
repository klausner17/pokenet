import { Request, Response, Router } from 'express';
import * as express from 'express';
import * as jwt from 'jwt-simple';
import * as passport from 'passport';
import * as file from '../boot';
import auth from '../middlewares/authentication';

const config: any = file.default;

const googleRouter: Router = express.Router();

googleRouter
  .route('/auth/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

googleRouter.route('/auth/google/callback').get(
  passport.authenticate('google', {
    failureRedirect: '/google/failure',
    session: false,
  }),
  (req: Request, res: Response) => {
    const token = jwt.encode(req.user, config.secretKey);
    res.redirect(`http://localhost:4200/processToken?token=${token}`);
  },
);

googleRouter.get('/google/failure', (req: Request, res: Response) => {
  res.sendStatus(401);
});

export default googleRouter;
