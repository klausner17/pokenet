import { Model, Table, Column, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { PokemonGym } from './PokemonGym';

@Table
export class Gym extends Model<Gym> {
    @Column
    alias: string;

    @Column
    name: string;
    
    @Column
    latitude: number;

    @Column
    longitude: number;

    @HasMany(() => PokemonGym)
    pokemonGym: PokemonGym[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}