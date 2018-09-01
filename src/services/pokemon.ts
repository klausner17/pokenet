import { Pokemon } from "../models/Pokemon";
import { IFindOptions } from "sequelize-typescript";

export class PokemonService {

  async allPokemons(): Promise<Pokemon[]> {
    const pokemonList = await Pokemon.findAll<Pokemon>();
    return pokemonList;
  }

  async findById(id: number): Promise<Pokemon> {
    const pokemon = await Pokemon.findById<Pokemon>(id);
    return pokemon;
  }

  async getAllActiveRaid(): Promise<Pokemon[]> {
    const options = <IFindOptions>{
      where: {
        activeRaid: true
      }
    }
    const pokemonList = await Pokemon.findAll<Pokemon>(options);
    return pokemonList;
  }
}
