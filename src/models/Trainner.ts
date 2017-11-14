import { ListRaid } from './ListRaid';
import { Table, Model, HasOne, Column, BelongsTo, ForeignKey, HasMany, Unique, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { User } from './User';

@Table
export class Trainner extends Model<Trainner>{
    
    @Column({unique: true, allowNull: false})
    name: String;

    @Column({allowNull: false})
    level: number;

    @ForeignKey(() => User)
    @Column({allowNull: false})
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}