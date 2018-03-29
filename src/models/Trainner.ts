import { ListRaid } from './ListRaid';
import {
  Table,
  Model,
  HasOne,
  Column,
  BelongsTo,
  ForeignKey,
  HasMany,
  Unique,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import { User } from './User';

@Table
export class Trainner extends Model<Trainner> {
  @Column({ unique: true, allowNull: false })
  public name: string;

  @Column({ allowNull: false })
  public level: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  public userId: number;

  @BelongsTo(() => User)
  public user: User;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
