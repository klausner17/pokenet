import { Column, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Model, Table } from 'sequelize-typescript';
import { Weakness } from './Weakness';

@Table
export class Type extends Model<Type> {
    @Column
    type: string;

    @HasMany(() => Weakness)
    weakness: Weakness[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}