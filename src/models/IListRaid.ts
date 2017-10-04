import * as mongoose from 'mongoose';
import IPokemonGym = require('./IPokemonGym')
import ITrainner = require('./ITrainner')
import { Schema } from 'mongoose';

interface IListRaid extends mongoose.Document{
    pokemonGym: IPokemonGym;
    meetingTime: Date;
    trainners: Schema.Types.ObjectId[];
    maxTrainners: Number;
}

export = IListRaid;