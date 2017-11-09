import { PokemonGym } from './PokemonGym';
import { Model, Table, HasOne, Column, HasMany, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Trainner } from './Trainner';
import { Gym } from './Gym';
import { RaidTrainners } from './RaidTrainners';

@Table
export class ListRaid extends Model<ListRaid>{

    @Column
    maxTrainners: Number;

    @Column
    timeToClose: Date;

    @Column
    meetingTime: Date;

    @ForeignKey(() => PokemonGym)
    pokemonGymId: number;

    @BelongsTo(() => PokemonGym)
    pokemonGym: PokemonGym[];

    @HasMany(() => RaidTrainners)
    raidTrainners: RaidTrainners[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
    
}
