var config: any;

const env = process.env.NODE_ENV;
console.log(env);
if (env) {
    config = require(`./config.${env}.js`);
}
config = require("./config.development.js");

export default config;