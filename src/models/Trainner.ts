import { ListRaid } from './ListRaid';
import { Table, Model, HasOne, Column, BelongsTo, ForeignKey, HasMany, Unique, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { User } from './User';

@Table
export class Trainner extends Model<Trainner>{
    @Column
    name: String;

    @Column
    level: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}