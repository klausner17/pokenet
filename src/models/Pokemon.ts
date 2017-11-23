import { Model, Table, Column, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { PokemonType } from './PokemonType';
import { PokemonGym } from './PokemonGym';

@Table
export class Pokemon extends Model<Pokemon> {
    @Column
    name: string;

    @HasMany(() => PokemonType)
    pokemType: PokemonType[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}