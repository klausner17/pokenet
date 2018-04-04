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
import { Model, Table, Column, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { PokemonType } from './PokemonType';
export let Pokemon = class extends Model {
};
__decorate([
    Column, 
    __metadata('design:type', String)
], Pokemon.prototype, "name");
__decorate([
    HasMany(() => PokemonType), 
    __metadata('design:type', Array)
], Pokemon.prototype, "pokemType");
__decorate([
    CreatedAt, 
    __metadata('design:type', Date)
], Pokemon.prototype, "createdAt");
__decorate([
    UpdatedAt, 
    __metadata('design:type', Date)
], Pokemon.prototype, "updatedAt");
Pokemon = __decorate([
    Table, 
    __metadata('design:paramtypes', [])
], Pokemon);
