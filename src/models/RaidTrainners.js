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
import { Trainner } from './Trainner';
import { Model, Table, Column, BelongsTo, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { ListRaid } from './ListRaid';
export let RaidTrainners = class extends Model {
};
__decorate([
    ForeignKey(() => Trainner),
    Column({ unique: 'uniqueTrainner' }), 
    __metadata('design:type', Number)
], RaidTrainners.prototype, "trainnerId");
__decorate([
    ForeignKey(() => ListRaid),
    Column({ unique: 'uniqueTrainner' }), 
    __metadata('design:type', Number)
], RaidTrainners.prototype, "raidId");
__decorate([
    BelongsTo(() => Trainner), 
    __metadata('design:type', Trainner)
], RaidTrainners.prototype, "trainner");
__decorate([
    BelongsTo(() => ListRaid), 
    __metadata('design:type', ListRaid)
], RaidTrainners.prototype, "listRaid");
__decorate([
    CreatedAt, 
    __metadata('design:type', Date)
], RaidTrainners.prototype, "createdAt");
__decorate([
    UpdatedAt, 
    __metadata('design:type', Date)
], RaidTrainners.prototype, "updatedAt");
RaidTrainners = __decorate([
    Table, 
    __metadata('design:paramtypes', [])
], RaidTrainners);
