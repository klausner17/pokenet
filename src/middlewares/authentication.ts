import {
  Strategy,
  StrategyOptions,
  ExtractJwt,
  VerifyCallback,
  VerifiedCallback
} from "passport-jwt";
import { User } from "../models/User";
import * as passport from "passport";
import { Handler } from "express-serve-static-core";
import {
  OAuth2Strategy,
  IOAuth2StrategyOption,
  Profile
} from "passport-google-oauth";
import * as file from '../boot';

class Authentication {

  config: any = file.default;

  constructor() {
    let optionsLocal: StrategyOptions = {
      secretOrKey: this.config.auth.secretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };
    let optionsGoogle: IOAuth2StrategyOption = {
      clientID: this.config.googleAuth.clientId,
      clientSecret: this.config.googleAuth.clientSecret,
      callbackURL: this.config.googleAuth.callbackURL
    };

    passport.serializeUser((user: User, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id: number, done) => {
      User.findById(id)
        .then(result => done(null, result))
        .catch(err => done(err, null));
    });

    let localStrategy = new Strategy(optionsLocal, this.verify);
    let googleStrategy = new OAuth2Strategy(optionsGoogle, this.googleVerify);
    passport.use(localStrategy);
    passport.use(googleStrategy);
  }

  verify(payload: User, done: VerifiedCallback): VerifyCallback | void {
    let error: Error;
    User.findById(payload.id)
      .then((user: User) => {
        if (user) {
          return done(null, { id: user.id, email: user.email });
        }
        return done(null, false);
      })
      .catch(err => done(err, null));
  }

  googleVerify(
    accesToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifiedCallback
  ): VerifyCallback | void {
    process.nextTick(() => {
      User.findOne({ where: { email: profile.emails[0].value } }).then(
        (user: User) => {
          if (user) {
            user.googleToken = accesToken;
            user
              .save()
              .then((result: User) => {
                return done(null, { id: result.id });
              })
              .catch(error => {
                return done(error, null);
              });
          } else {
            User.create({
              name: profile.name.givenName,
              email: profile.emails[0].value,
              googleToken: accesToken
            })
              .then((result: User) => {
                return done(null, { id: result.id });
              })
              .catch(error => {
                return done(error, null);
              });
          }
        }
      );
    });
  }

  initialize(): Handler {
    return passport.initialize();
  }

  authenticate(): Handler {
    return passport.authenticate("jwt", { session: this.config.session });
  }
}

var auth: Authentication = new Authentication();
export default auth;
