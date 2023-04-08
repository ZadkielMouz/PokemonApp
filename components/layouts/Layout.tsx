import Head from "next/head";
import { Navbar } from '../ui';

type Props = {
    children: JSX.Element | JSX.Element[];
    title?: string
}

const origin = (typeof window) === 'undefined' ? '' : window.location.origin;

export const Layout = ({ children, title }: Props) => {
    return (
        <>
            <Head>
                <title>{title || 'PokemonApp'}</title>
                <meta name="author" content="Angel Mouzaber" />
                <meta name="description" content={`Información sobre el pokémon ${title}`} />
                <meta name="keywords" content={`${title}, pókemon, pokedex`} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
                <link rel="shortcut icon" href="favicon.svg" type="image/svg" />

                <meta property="og:title" content={`Información sobre ${ title }`} />
                <meta property="og:description" content={`Esta es la página sobre ${ title }`} />
                <meta property="og:image" content={`${ origin }/img/banner.png`} />
            </Head>

            {/* Navbar */}
            <Navbar />

            <main style={{
                padding: '0px 20px'
            }}>
                {children}
            </main>
        </>
    )
}
