import { Trainer } from './Trainer';
import {
  Model,
  Table,
  Column,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  ForeignKey
} from 'sequelize-typescript';
import { ListRaid } from './ListRaid';

@Table
export class RaidTrainer extends Model<RaidTrainer> {
  @ForeignKey(() => Trainer)
  @Column({unique: 'uniqueTrainner'})
  public trainnerId: number;

  @ForeignKey(() => ListRaid)
  @Column({unique: 'uniqueTrainner'})
  public raidId: number;

  @BelongsTo(() => Trainer)
  public trainer: Trainer;

  @BelongsTo(() => ListRaid)
  public listRaid: ListRaid;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
