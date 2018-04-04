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
import { Table, Model, Column, BelongsTo, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { User } from './User';
export let Trainner = class extends Model {
};
__decorate([
    Column({ unique: true, allowNull: false }), 
    __metadata('design:type', String)
], Trainner.prototype, "name");
__decorate([
    Column({ allowNull: false }), 
    __metadata('design:type', Number)
], Trainner.prototype, "level");
__decorate([
    ForeignKey(() => User),
    Column({ allowNull: false }), 
    __metadata('design:type', Number)
], Trainner.prototype, "userId");
__decorate([
    BelongsTo(() => User), 
    __metadata('design:type', User)
], Trainner.prototype, "user");
__decorate([
    CreatedAt, 
    __metadata('design:type', Date)
], Trainner.prototype, "createdAt");
__decorate([
    UpdatedAt, 
    __metadata('design:type', Date)
], Trainner.prototype, "updatedAt");
Trainner = __decorate([
    Table, 
    __metadata('design:paramtypes', [])
], Trainner);
