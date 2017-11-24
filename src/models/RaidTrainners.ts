import { Trainner } from "./Trainner";
import {
  Model,
  Table,
  Column,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  ForeignKey
} from "sequelize-typescript";
import { ListRaid } from "./ListRaid";

@Table
export class RaidTrainners extends Model<RaidTrainners> {
  @ForeignKey(() => Trainner)
  trainnerId: number;

  @ForeignKey(() => ListRaid)
  raidId: number;

  @BelongsTo(() => Trainner)
  trainner: Trainner;

  @BelongsTo(() => ListRaid)
  listRaid: ListRaid;

  @CreatedAt createdAt: Date;

  @UpdatedAt updatedAt: Date;
}
