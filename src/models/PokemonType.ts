import { Type } from "./Type";
import { Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Table, Model } from "sequelize-typescript";
import { Pokemon } from "./Pokemon";

@Table
export class PokemonType extends Model<PokemonType> {
  @ForeignKey(() => Pokemon)
  @Column
  pokemonId: number;

  @ForeignKey(() => Type)
  @Column
  typeId: number;

  @BelongsTo(() => Pokemon)
  pokemon: Pokemon;

  @BelongsTo(() => Type)
  type: Type;
}
