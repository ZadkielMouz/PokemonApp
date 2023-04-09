import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts';
import { Pokemon2, PokemonListResponse } from '@/interfaces';
import { getPokemonInfo, localFavorites } from '@/utils';


interface Props {
    pokemon: Pokemon2;
}


const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState<boolean>();

    useEffect(() => {
        setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
    }, []);
    

    const capitalize = (name: string): string => {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInFavorites);

        if(isInFavorites) return;

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0
            }
        })
    }

    return (
        <Layout title={`${capitalize(pokemon.name)} Page`}>
            <Grid.Container
                css={{ marginTop: '5px' }} gap={2}
            >
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={pokemon.name}
                                width='100%'
                                height='200px'
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card css={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <Card.Header
                            css={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap'
                            }}

                        >
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>

                            <Button
                                color="gradient"
                                ghost={ !isInFavorites }
                                onPress={onToggleFavorite}
                            >
                                {isInFavorites ? '⭐' : 'Guardar como favorito'}
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container direction='row' display='flex' gap={0}>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    return {
        paths: data.results.map(({name}) => ({
            params: { name }
        })),
        fallback: "blocking" //Esto hace que permita pasar a las demás rutas así no existan, las props sería null y habría que manejar eso.
        // fallback: false //Colocando esto en false hace que al ingresar a una ruta que no esté definida, mande un error 404
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string }; // Esto se hace para colocar el tipado a los params

    const pokemon = await getPokemonInfo( name );
    
    if( !pokemon ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            pokemon: pokemon
        },
        revalidate: 86400 // 60seg * 60min * 24h *se regenera la app cada 24 horas*
    }
}



export default PokemonByNamePage;