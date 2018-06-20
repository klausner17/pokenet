import {
  Model,
  Table,
  Column,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';

@Table
export class Pokemon extends Model<Pokemon> {
  @Column public name: string;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
