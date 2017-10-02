import * as mongoose from 'mongoose';

enum Team{
    Mystic = 1,
    Instinct = 2,
    Valor = 3
};

interface ITrainner extends mongoose.Document{
    name: String;
    team: Team;
    level: number;
}

export = ITrainner;