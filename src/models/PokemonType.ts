import { Type } from './Type';
import { Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Table, Model } from 'sequelize-typescript';
import { Pokemon } from './Pokemon';

@Table
export class PokemonType extends Model<PokemonType> {
  @ForeignKey(() => Pokemon)
  @Column
  public pokemonId: number;

  @ForeignKey(() => Type)
  @Column
  public typeId: number;

  @BelongsTo(() => Pokemon)
  public pokemon: Pokemon;

  @BelongsTo(() => Type)
  public type: Type;
}
