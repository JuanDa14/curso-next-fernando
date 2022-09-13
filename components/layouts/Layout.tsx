import { FC } from 'react';
import Head from 'next/head';

import { Navbar } from '../ui';

interface Props {
	children: JSX.Element;
	title?: string;
}

const origin = (typeof window !== 'undefined' && window.location.origin) || '';

export const Layout: FC<Props> = ({ children, title }) => {
	return (
		<>
			<Head>
				<title>{title || 'Pokemon App'}</title>
				<meta name='author' content='Juan Morales' />
				<meta name='description' content='Informacion sobre el pokemon' />
				<meta name='keywords' content='XXXX, pokemon, pokedex' />
				<meta property='og:title' content={`Informacion sobre ${title || 'Pokemons'}`} />
				<meta
					property='og:description'
					content={`Esta es la pagina sobre ${title || 'Pokemons'}`}
				/>
				<meta property='og:image' content={`${origin}/img/banner.png`} />
			</Head>
			<Navbar />
			<main
				style={{
					padding: '0px 20px',
				}}
			>
				{children}
			</main>
		</>
	);
};

export default Layout;
