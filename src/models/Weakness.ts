import { Column, ForeignKey, BelongsTo, Table, UpdatedAt, Model, CreatedAt } from 'sequelize-typescript';
import { Type } from './Type';

@Table
export class Weakness extends Model<Weakness> {
    @ForeignKey(() => Type)
    @Column
    typeId: number;

    @ForeignKey(() => Type)
    @Column
    weaknessTypeId: number

    @BelongsTo(() => Type)
    type: Type;

    @BelongsTo(() => Type)
    weaknessType: Type;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}