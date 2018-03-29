import { ListRaid } from './ListRaid';
import {
  Model,
  Table,
  Column,
  HasMany,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';

@Table
export class Gym extends Model<Gym> {
  @Column public alias: string;

  @Column public name: string;

  @Column public latitude: string;

  @Column public longitude: string;

  @HasMany(() => ListRaid)
  public pokemonGym: ListRaid[];

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
