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

  @Column public cpRaid: number;

  @Column public activeRaid: boolean;

  @Column public raidLevel: number;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
