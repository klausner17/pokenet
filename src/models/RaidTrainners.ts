import { Trainner } from './Trainner';
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
export class RaidTrainners extends Model<RaidTrainners> {
  @ForeignKey(() => Trainner)
  @Column({unique: 'uniqueTrainner'})
  public trainnerId: number;

  @ForeignKey(() => ListRaid)
  @Column({unique: 'uniqueTrainner'})
  public raidId: number;

  @BelongsTo(() => Trainner)
  public trainner: Trainner;

  @BelongsTo(() => ListRaid)
  public listRaid: ListRaid;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
