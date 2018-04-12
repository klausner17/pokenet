import {
  Model,
  Table,
  Column,
  HasMany,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import { PokemonGym } from './PokemonGym';

@Table
export class Pokemon extends Model<Pokemon> {
  @Column public name: string;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
