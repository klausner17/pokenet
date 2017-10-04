import * as mongoose from 'mongoose';
import ITrainner = require('../models/ITrainner');
import EnumTeam = require('../enums/EnumTeam');

var trainnerSchema = new mongoose.Schema({
    name: {
        type: String, required: true, unique: true
    },
    team: {
        type: EnumTeam, required: true
    },
    level: {
        type: Number, required: true, max: 40
    }
});

var Trainner = mongoose.model<ITrainner>('Trainner', trainnerSchema);
export = Trainner;