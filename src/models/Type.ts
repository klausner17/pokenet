import {
  Column,
  HasMany,
  CreatedAt,
  UpdatedAt,
  Unique
} from 'sequelize-typescript';
import { Model, Table } from 'sequelize-typescript';

@Table
export class Type extends Model<Type> {
  @Unique
  @Column
  public type: string;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
