import { SmallPokemon } from "@/interfaces"
import { Grid } from "@nextui-org/react"
import { PokemonCard } from "./PokemonCard";

interface Props {
    pokemons: SmallPokemon[];
}
export const PokemonList = ({pokemons}: Props) => {
    return (
        <Grid.Container gap={2} justify='flex-start'>
            {
                pokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))
            }
        </Grid.Container>
    )
}
