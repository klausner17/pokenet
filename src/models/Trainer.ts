import {
  Table,
  Model,
  Column,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import { User } from './User';

@Table
export class Trainer extends Model<Trainer> {
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
