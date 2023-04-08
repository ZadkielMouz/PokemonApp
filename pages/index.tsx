import { GetStaticProps, NextPage } from 'next'
import { pokeApi } from '@/api';
import { Layout } from "@/components/layouts";
import { PokemonListResponse, SmallPokemon } from '@/interfaces';
import { PokemonList } from '../components/pokemon';

interface Props {
    pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

    return (
        <Layout title="Listado de Pokémons">
            <PokemonList pokemons={ pokemons }/>
        </Layout>
    )
}

export default HomePage

// export default function HomePage({pokemons}: Props) {
//     console.log(pokemons);
//     return (
//         <Layout title="Listado de Pokémons">
//             <ul>
//                 <li>Pokémon</li>
//                 <li>Pokémon</li>
//                 <li>Pokémon</li>
//                 <li>Pokémon</li>
//                 <li>Pokémon</li>
//                 <li>Pokémon</li>
//                 <li>Pokémon</li>
//                 <li>Pokémon</li>
//                 <li>Pokémon</li>
//                 <li>Pokémon</li>
//             </ul>
//         </Layout>
//     )
// }

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');  // your fetch function here 

    const pokemons: SmallPokemon[] = data.results.map(
        (pokemon, index) => (
            {
                ...pokemon,
                id: index + 1,
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
            }
        )
    )

    return {
        props: {
            pokemons
        }
    }
}
