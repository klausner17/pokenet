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
import { User } from './User';
import { PokemonGym } from './PokemonGym';
import { Model, Table, Column, HasMany, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Gym } from './Gym';
import { RaidTrainners } from './RaidTrainners';
export let ListRaid = class extends Model {
};
__decorate([
    Column({ allowNull: false }), 
    __metadata('design:type', Number)
], ListRaid.prototype, "maxTrainners");
__decorate([
    Column({ allowNull: false }), 
    __metadata('design:type', Date)
], ListRaid.prototype, "timeToClose");
__decorate([
    Column({ allowNull: false }), 
    __metadata('design:type', Date)
], ListRaid.prototype, "meetingTime");
__decorate([
    ForeignKey(() => User),
    Column({ allowNull: false }), 
    __metadata('design:type', Number)
], ListRaid.prototype, "userId");
__decorate([
    ForeignKey(() => PokemonGym),
    Column({ allowNull: false }), 
    __metadata('design:type', Number)
], ListRaid.prototype, "pokemonGymId");
__decorate([
    ForeignKey(() => Gym),
    Column({ allowNull: false }), 
    __metadata('design:type', Number)
], ListRaid.prototype, "gymId");
__decorate([
    BelongsTo(() => User), 
    __metadata('design:type', User)
], ListRaid.prototype, "user");
__decorate([
    BelongsTo(() => PokemonGym), 
    __metadata('design:type', PokemonGym)
], ListRaid.prototype, "pokemonGym");
__decorate([
    BelongsTo(() => Gym), 
    __metadata('design:type', Gym)
], ListRaid.prototype, "gym");
__decorate([
    HasMany(() => RaidTrainners), 
    __metadata('design:type', Array)
], ListRaid.prototype, "raidTrainners");
__decorate([
    CreatedAt, 
    __metadata('design:type', Date)
], ListRaid.prototype, "createdAt");
__decorate([
    UpdatedAt, 
    __metadata('design:type', Date)
], ListRaid.prototype, "updatedAt");
ListRaid = __decorate([
    Table, 
    __metadata('design:paramtypes', [])
], ListRaid);
