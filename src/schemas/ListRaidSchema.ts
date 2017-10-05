import * as mongoose from 'mongoose';
import IListRaid = require('../models/IListRaid');

var listRaidSchema = new mongoose.Schema({
    gym: {type: String, required: true}
    , pokemon: {type: String, required: true}
    , meetingTime: {type: mongoose.SchemaTypes.Date, require: true}
    , timeToClose: {type: mongoose.SchemaTypes.Date, require: true}
    , trainners: {type: mongoose.SchemaTypes.Array, unique: true}
    , maxTrainners: {type: Number, required: true, default: 20, max:20}
});

var listRaid = mongoose.model<IListRaid>('ListRaid', listRaidSchema);
export = listRaid;