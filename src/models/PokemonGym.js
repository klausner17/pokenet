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
import { Pokemon } from './Pokemon';
import { Model, Table, Column, BelongsTo, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
export var Level;
(function (Level) {
    Level[Level["oneStar"] = 0] = "oneStar";
    Level[Level["twoStar"] = 1] = "twoStar";
    Level[Level["threeStar"] = 2] = "threeStar";
    Level[Level["fourStar"] = 3] = "fourStar";
    Level[Level["legend"] = 4] = "legend";
})(Level || (Level = {}));
export let PokemonGym = class extends Model {
    constructor(...args) {
        super(...args);
        this.pokemon = Pokemon;
    }
};
__decorate([
    Column, 
    __metadata('design:type', Number)
], PokemonGym.prototype, "combatPower");
__decorate([
    ForeignKey(() => Pokemon),
    Column, 
    __metadata('design:type', Number)
], PokemonGym.prototype, "pokemonId");
__decorate([
    BelongsTo(() => Pokemon), 
    __metadata('design:type', Object)
], PokemonGym.prototype, "pokemon");
__decorate([
    CreatedAt, 
    __metadata('design:type', Date)
], PokemonGym.prototype, "createdAt");
__decorate([
    UpdatedAt, 
    __metadata('design:type', Date)
], PokemonGym.prototype, "updatedAt");
PokemonGym = __decorate([
    Table, 
    __metadata('design:paramtypes', [])
], PokemonGym);
