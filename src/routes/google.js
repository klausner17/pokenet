import * as express from 'express';
import * as jwt from 'jwt-simple';
import * as passport from 'passport';
import * as file from '../boot';
const config = file.default;
const googleRouter = express.Router();
googleRouter
    .route('/auth/google')
    .get(passport.authenticate('google', { scope: ['profile', 'email'] }));
googleRouter.route('/auth/google/callback').get(passport.authenticate('google', {
    failureRedirect: '/google/failure',
    session: false,
}), (req, res) => {
    const token = jwt.encode(req.user, config.secretKey);
    res.redirect(`http://localhost:4200/processToken?token=${token}`);
});
googleRouter.get('/google/failure', (req, res) => {
    res.sendStatus(401);
});
export default googleRouter;
