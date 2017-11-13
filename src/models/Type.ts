import { Column, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Model, Table } from 'sequelize-typescript';

@Table
export class Type extends Model<Type> {
    @Column
    type: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}