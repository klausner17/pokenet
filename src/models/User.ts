import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, AfterSave, BeforeCreate } from "sequelize-typescript";
import { Trainner } from "./Trainner";
import * as bcrypt from "bcrypt"

@Table
export class User extends Model<User> {
    @Column
    name: string;

    @Column
    email: string;

    @Column
    password:string;

    @HasMany(() => Trainner)
    trainners: Trainner[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @BeforeCreate
    static hashPassword(instance: User){
        console.log(instance);
        let salt = bcrypt.genSaltSync();
        instance.password = bcrypt.hashSync(instance.password, salt);
    }
}