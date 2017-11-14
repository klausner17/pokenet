import { Pokemon } from './Pokemon';
import { Model, Table, Column, HasOne, BelongsTo, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Gym } from './Gym';

export enum Level {
    oneStar = 0,
    twoStar = 1,
    threeStar = 2,
    fourStar = 3,
    legend = 4
}

@Table
export class PokemonGym extends Model<PokemonGym> {
    
    @Column
    combatPower: number;

    @ForeignKey(() => Pokemon)
    @Column
    pokemonId: number;

    @BelongsTo(() => Pokemon)
    pokemon = Pokemon;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}