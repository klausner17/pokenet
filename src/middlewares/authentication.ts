import { Strategy, StrategyOptions, ExtractJwt, VerifyCallback, VerifiedCallback } from "passport-jwt";
import { User } from "../models/User";
import * as passport from "passport";
import { Handler } from "express-serve-static-core";


class Authentication {

    private _config = require("../config.json").authentication;
    strategy: Strategy;

    constructor() {
        let options: StrategyOptions = {
            secretOrKey: this._config.secretKey,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        };
        this.strategy = new Strategy(options, this.verify);
        passport.use(this.strategy);
    }

    verify(payload: User, done: VerifiedCallback): VerifyCallback | void {
        let error: Error;
        User.findById(payload.id)
            .then((user: User) => {
                if (user) {
                    return done(null, {id: user.id, email: user.email});
                }
                return done(null, false);
            })
            .catch(err => done(err, null));
    }

    initialize(): Handler {
        return passport.initialize();
    }

    authenticate(): Handler {
        return passport.authenticate("jwt", {session: this._config.session});
    }
}

var auth: Authentication = new Authentication();
export default auth;
