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
import { Type } from './Type';
import { Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Table, Model } from 'sequelize-typescript';
import { Pokemon } from './Pokemon';
export let PokemonType = class extends Model {
};
__decorate([
    ForeignKey(() => Pokemon),
    Column, 
    __metadata('design:type', Number)
], PokemonType.prototype, "pokemonId");
__decorate([
    ForeignKey(() => Type),
    Column, 
    __metadata('design:type', Number)
], PokemonType.prototype, "typeId");
__decorate([
    BelongsTo(() => Pokemon), 
    __metadata('design:type', Pokemon)
], PokemonType.prototype, "pokemon");
__decorate([
    BelongsTo(() => Type), 
    __metadata('design:type', Type)
], PokemonType.prototype, "type");
PokemonType = __decorate([
    Table, 
    __metadata('design:paramtypes', [])
], PokemonType);
