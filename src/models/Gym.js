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
import { Model, Table, Column, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
export let Gym = class extends Model {
};
__decorate([
    Column, 
    __metadata('design:type', String)
], Gym.prototype, "alias");
__decorate([
    Column, 
    __metadata('design:type', String)
], Gym.prototype, "name");
__decorate([
    Column, 
    __metadata('design:type', String)
], Gym.prototype, "latitude");
__decorate([
    Column, 
    __metadata('design:type', String)
], Gym.prototype, "longitude");
__decorate([
    HasMany(() => ListRaid), 
    __metadata('design:type', Array)
], Gym.prototype, "pokemonGym");
__decorate([
    CreatedAt, 
    __metadata('design:type', Date)
], Gym.prototype, "createdAt");
__decorate([
    UpdatedAt, 
    __metadata('design:type', Date)
], Gym.prototype, "updatedAt");
Gym = __decorate([
    Table, 
    __metadata('design:paramtypes', [])
], Gym);
