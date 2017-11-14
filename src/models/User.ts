import { ListRaid } from './ListRaid';
import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, AfterSave, BeforeCreate, Unique } from 'sequelize-typescript';
import { Trainner } from "./Trainner";
import * as bcrypt from "bcrypt"

@Table
export class User extends Model<User> {
    @Column({ allowNull: false})
    name: string;

    @Column({unique: true, allowNull: false})
    email: string;

    @Column({ allowNull: false})
    password:string;

    @HasMany(() => Trainner)
    trainners: Trainner[];

    @HasMany(() => ListRaid)
    listRaid: ListRaid[];

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

    verifyPassword(pass: string): boolean {
        return bcrypt.compareSync(pass, this.password);
    }
}
