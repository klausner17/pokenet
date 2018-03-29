import {
  Model,
  Table,
  Column,
  HasMany,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import { PokemonType } from './PokemonType';
import { PokemonGym } from './PokemonGym';

@Table
export class Pokemon extends Model<Pokemon> {
  @Column public name: string;

  @HasMany(() => PokemonType)
  public pokemType: PokemonType[];

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
