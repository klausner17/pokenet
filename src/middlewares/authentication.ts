import { Strategy, StrategyOptions, ExtractJwt, VerifyCallback } from 'passport-jwt';
import { User } from '../models/User';
import * as passport from 'passport';


class AuthenticateOptions {

    private _config = require('../config.json')['authentication'];
    strategy: Strategy;

    constructor() {
        let options: StrategyOptions = {
            secretOrKey: this._config['secretKey'],
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }
        this.strategy = new Strategy(options, this.verify);
        passport.use(this.strategy);
    }

    verify(payload: User, done): VerifyCallback {
        let error;
        User.findById(payload.id)
            .then((user: User) => {
                if (user) return done(
                    null,
                    {id: user.id, email: user.email}
                )
                return done(null, false);
            })
            .catch(err => error = err)
        return done(error, null);
    }

    initialize() {
        return passport.initialize();
    }

    authenticate() {
        return passport.authenticate("jwt", {session: this._config['session']});
    }
}
