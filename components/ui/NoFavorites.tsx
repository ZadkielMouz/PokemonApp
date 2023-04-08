import { Container, Text } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

export const NoFavorites = () => {
    return (
        <Container
            css={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 100px)',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center'
            }}
        >
            <Text h1>No hay Favoritos!</Text>
            <Image
                src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
                alt="Pokemon"
                width={250}
                height={250}
            />
        </Container>
    )
}
