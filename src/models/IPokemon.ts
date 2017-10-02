import * as mongoose from 'mongoose';
import IPokemonType = require ('./IPokemonType');

enum PokemonDifficulty{
    OneStar = 0,
    TwoStar = 1,
    ThreeStar = 2,
    FourStar = 3,
    FiveStar = 4
};


interface IPokemon extends mongoose.Document{
    name: String;
    types: IPokemonType;
    difficulty: PokemonDifficulty;
}

export = IPokemon;