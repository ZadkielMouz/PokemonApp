import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Layout } from "@/components/layouts";
import { NoFavorites } from "@/components/ui";
import { localFavorites } from "@/utils";
import { FavoritePokemons } from "@/components/pokemon";


const FavoritesPage: NextPage = () => {

    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritePokemons(localFavorites.pokemons());
    }, [])

    return (
        <Layout title="Pokémons - Favoritos">
            {
                favoritePokemons.length > 0
                ? (
                    <FavoritePokemons pokemons={ favoritePokemons } />
                ) 
                : <NoFavorites />
            }
        </Layout>
    )
}

export default FavoritesPage;