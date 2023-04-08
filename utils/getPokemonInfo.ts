import { pokeApi } from "@/api"
import { Pokemon2 } from "@/interfaces"


export const getPokemonInfo = async( nameOrId: string) => {

    const { data } = await pokeApi.get<Pokemon2>(`/pokemon/${ nameOrId }`);

    return { 
        id: data.id,
        name: data.name,
        sprites: data.sprites
    }
}