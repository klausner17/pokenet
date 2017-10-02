import * as mongoose from 'mongoose';
import EnumTeam = require('../enums/EnumTeam');

interface ITrainner extends mongoose.Document{
    name: String;
    team: EnumTeam;
    level: number;
}

export = ITrainner;