import * as mongoose from 'mongoose';
import IListRaid = require('../models/IListRaid');

var listRaidSchema = new mongoose.Schema({
    pokemonGym: {type: mongoose.SchemaTypes.ObjectId, required: true}
    , meetingTime: {type: mongoose.SchemaTypes.Date, require: true}
    , trainners: {type:[mongoose.SchemaTypes.ObjectId}
    , maxTrainners: {type: Number, required: true, default: 20, max:20}
});

var listRaid = mongoose.model<IListRaid>('ListRaid', listRaidSchema);
export = listRaid;