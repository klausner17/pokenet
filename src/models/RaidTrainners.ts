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
  trainnerId: Trainner;

  @ForeignKey(() => ListRaid)
  raidId: ListRaid;

  @BelongsTo(() => Trainner)
  trainner: Trainner;

  @BelongsTo(() => ListRaid)
  listRaid: ListRaid;

  @CreatedAt createdAt: Date;

  @UpdatedAt updatedAt: Date;
}
