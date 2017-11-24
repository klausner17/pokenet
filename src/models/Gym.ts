import { ListRaid } from "./ListRaid";
import {
  Model,
  Table,
  Column,
  HasMany,
  CreatedAt,
  UpdatedAt
} from "sequelize-typescript";

@Table
export class Gym extends Model<Gym> {
  @Column alias: string;

  @Column name: string;

  @Column latitude: string;

  @Column longitude: string;

  @HasMany(() => ListRaid)
  pokemonGym: ListRaid[];

  @CreatedAt createdAt: Date;

  @UpdatedAt updatedAt: Date;
}
