import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import ITrainner = require ('./ITrainner');

interface IListRaid extends mongoose.Document{
    gym: String;
    pokemon: String;
    timeToClose: Date;
    meetingTime: Date;
    trainners: Array<ITrainner>;
    maxTrainners: Number;
}

export = IListRaid;