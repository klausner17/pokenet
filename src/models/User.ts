import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt } from "sequelize-typescript";
import { Trainner } from "./Trainner";
import * as bcrypt from "bcrypt"

@Table
export class User extends Model<User> {
    @Column
    name: string;

    @Column
    email: string;

    @Column
    set password(value: string) {
        if(!this.isNewRecord || !bcrypt.compare(this.password, value)) {
            this.password = bcrypt.hashSync(this.password, 10);
        }
    }

    @HasMany(() => Trainner)
    trainners: Trainner[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}