import * as mongoose from 'mongoose';
import IPokemon = require('./IPokemon');

interface IPokemonGym extends mongoose.Document{
    pokemon: IPokemon;
    combatPower: number;
    latitude: Number;
    longitude: Number;
}
export = IPokemonGym;