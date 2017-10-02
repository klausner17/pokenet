import * as mongoose from 'mongoose';
import IPokemonGym = require('./IPokemonGym')
import ITrainner = require('./ITrainner')

interface IListRaid extends mongoose.Document{
    pokemonGym: IPokemonGym;
    meetingTime: Date;
    trainners: ITrainner[];
    maxTrainners: Number;
}

export = IListRaid;