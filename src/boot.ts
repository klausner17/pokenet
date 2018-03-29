let config: any;

const env = process.env.NODE_ENV;
if (env) {
    // tslint:disable-next-line:no-var-requires
    config = require(`./config.${env}.js`);
} else {
    // tslint:disable-next-line:no-var-requires
    config = require('./config.development.js');
}

export default config;
