import { ListRaid } from './ListRaid';
import {
  Table,
  Column,
  Model,
  HasMany,
  CreatedAt,
  UpdatedAt,
  AfterSave,
  BeforeCreate,
  Unique
} from 'sequelize-typescript';
import { Trainner } from './Trainner';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model<User> {

  @BeforeCreate
  public static hashPassword(instance: User) {
    if (instance.password) {
      const salt = bcrypt.genSaltSync();
      instance.password = bcrypt.hashSync(instance.password, salt);
    }
  }

  @Column({ allowNull: false })
  public name: string;

  @Column({ unique: true, allowNull: false })
  public email: string;

  @Column public password: string;

  @Column public googleToken: string;

  @HasMany(() => Trainner)
  public trainners: Trainner[];

  @HasMany(() => ListRaid)
  public listRaid: ListRaid[];

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  public verifyPassword(pass: string): boolean {
    return bcrypt.compareSync(pass, this.password);
  }
}
