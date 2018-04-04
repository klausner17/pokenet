var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ListRaid } from './ListRaid';
import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, BeforeCreate } from 'sequelize-typescript';
import { Trainner } from './Trainner';
import * as bcrypt from 'bcrypt';
export let User = class extends Model {
    static hashPassword(instance) {
        if (instance.password) {
            const salt = bcrypt.genSaltSync();
            instance.password = bcrypt.hashSync(instance.password, salt);
        }
    }
    verifyPassword(pass) {
        return bcrypt.compareSync(pass, this.password);
    }
};
__decorate([
    Column({ allowNull: false }), 
    __metadata('design:type', String)
], User.prototype, "name");
__decorate([
    Column({ unique: true, allowNull: false }), 
    __metadata('design:type', String)
], User.prototype, "email");
__decorate([
    Column, 
    __metadata('design:type', String)
], User.prototype, "password");
__decorate([
    Column, 
    __metadata('design:type', String)
], User.prototype, "googleToken");
__decorate([
    HasMany(() => Trainner), 
    __metadata('design:type', Array)
], User.prototype, "trainners");
__decorate([
    HasMany(() => ListRaid), 
    __metadata('design:type', Array)
], User.prototype, "listRaid");
__decorate([
    CreatedAt, 
    __metadata('design:type', Date)
], User.prototype, "createdAt");
__decorate([
    UpdatedAt, 
    __metadata('design:type', Date)
], User.prototype, "updatedAt");
Object.defineProperty(User, "hashPassword",
    __decorate([
        BeforeCreate, 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [User]), 
        __metadata('design:returntype', Object)
    ], User, "hashPassword", Object.getOwnPropertyDescriptor(User, "hashPassword")));
User = __decorate([
    Table, 
    __metadata('design:paramtypes', [])
], User);
