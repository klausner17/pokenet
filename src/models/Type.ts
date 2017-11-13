import { Column, HasMany, CreatedAt, UpdatedAt, Unique } from 'sequelize-typescript';
import { Model, Table } from 'sequelize-typescript';

@Table
export class Type extends Model<Type> {
    @Column
    @Unique
    type: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}