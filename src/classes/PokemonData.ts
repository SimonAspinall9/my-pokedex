import axios from "axios";
import config from "../config.json";

const myAxios = axios.create({ baseURL: config.pokeApiBaseUrl });

export interface PokeApiResults {
  count: number;
  next: string;
  previous: string;
  results: PokemonUrl[];
}

export interface PokemonUrl {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  spriteUrl: string;
  dreamWorldSpriteUrl: string;
  stats: Stat[];
  abilities: Ability[];
  types: Type[];
}

export interface Type {
  name: string;
}

export interface Stat {
  base: number;
  name: string;
}

export interface Ability {
  name: string;
}

export const getPokemonData = async (): Promise<PokeApiResults> => {
  const resp = await myAxios.get<PokeApiResults>("?limit=20");

  return resp && resp.status === 200 && resp.data
    ? resp.data
    : { count: 0, next: "", previous: "", results: [] };
};

export const getPokemonNextPrevious = async (url: string) => {
  const resp = await axios.get<PokeApiResults>(url);
  return resp && resp.status === 200 && resp.data
    ? resp.data
    : { count: 0, next: "", previous: "", results: [] };
};

export const getPokemon = async (): Promise<Pokemon[]> => {
  const resp = await myAxios.get<PokeApiResults>("?limit=20");
  if (resp && resp.status === 200 && resp.data) {
    const data = resp.data.results;
    let pokemon: Pokemon[] = [];
    for (const d of data) {
      pokemon.push(await getPokemonByName(d.name));
    }
    return pokemon;
  }

  return [];
};

export const getPokemonByName = async (name: string): Promise<Pokemon> => {
  const resp = await myAxios.get<any>(`/${name}`);
  return {
    id: resp.data.id,
    name: resp.data.name,
    height: resp.data.height,
    weight: resp.data.weight,
    abilities: resp.data.abilities.map((a: any) => a.ability),
    spriteUrl: resp.data.sprites.front_default,
    dreamWorldSpriteUrl: resp.data.sprites.other.dream_world.front_default,
    stats: resp.data.stats,
    types: resp.data.types.map((t: any) => t.type),
  };
};
