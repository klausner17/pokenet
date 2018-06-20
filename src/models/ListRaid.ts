import { User } from './User';
import { Pokemon } from './Pokemon';
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
} from 'sequelize-typescript';
import { Trainner } from './Trainner';
import { Gym } from './Gym';
import { RaidTrainners } from './RaidTrainners';

@Table
export class ListRaid extends Model<ListRaid> {
  @Column({ allowNull: false })
  public maxTrainners: number;

  @Column({ allowNull: false })
  public timeToClose: Date;

  @Column({ allowNull: false })
  public meetingTime: Date;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  public userId: number;

  @ForeignKey(() => Pokemon)
  @Column({ allowNull: false })
  public pokemonGymId: number;

  @ForeignKey(() => Gym)
  @Column({ allowNull: false })
  public gymId: number;

  @BelongsTo(() => User)
  public user: User;

  @BelongsTo(() => Pokemon)
  public pokemon: Pokemon;

  @BelongsTo(() => Gym)
  public gym: Gym;

  @HasMany(() => RaidTrainners)
  public raidTrainners: RaidTrainners[];

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
