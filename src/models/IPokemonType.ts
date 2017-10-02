import * as mongoose from 'mongoose';

interface IPokemonType extends mongoose.Document{
    type: String;
}

export = IPokemonType;