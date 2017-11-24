import { User } from "./User";
import { PokemonGym } from "./PokemonGym";
import {
  Model,
  Table,
  HasOne,
  Column,
  HasMany,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript";
import { Trainner } from "./Trainner";
import { Gym } from "./Gym";
import { RaidTrainners } from "./RaidTrainners";

@Table
export class ListRaid extends Model<ListRaid> {
  @Column({ allowNull: false })
  maxTrainners: Number;

  @Column({ allowNull: false })
  timeToClose: Date;

  @Column({ allowNull: false })
  meetingTime: Date;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @ForeignKey(() => PokemonGym)
  @Column({ allowNull: false })
  pokemonGymId: number;

  @ForeignKey(() => Gym)
  @Column({ allowNull: false })
  gymId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => PokemonGym)
  pokemonGym: PokemonGym;

  @BelongsTo(() => Gym)
  gym: Gym;

  @HasMany(() => RaidTrainners)
  raidTrainners: RaidTrainners[];

  @CreatedAt createdAt: Date;

  @UpdatedAt updatedAt: Date;
}
