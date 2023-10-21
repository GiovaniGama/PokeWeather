export interface PokemonList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export interface Pokemon {
    name: string;
    url: string;
}

export interface ReturnPokemonDetail {
    id: number;
    name: string;
    types: string;
    sprites: string;
}

export interface PokemonDetail {
    id: number;
    name: string;
    types: PokemonType[];
    sprites: {
        other: {
            dream_world: {
                front_default: string
            }
        };
    };
}

interface PokemonType {
    type: {
        name: string;
    };
}

