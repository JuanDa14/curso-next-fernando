import { GetStaticProps } from 'next';
import type { NextPage } from 'next';
import { Grid } from '@nextui-org/react';

import { Layout } from '../components/layouts';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';

interface Props {
	pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
	return (
		<Layout>
			<Grid.Container gap={2} justify='flex-start'>
				{pokemons.map((pokemon) => (
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
				))}
			</Grid.Container>
		</Layout>
	);
};

// ?Cuando ya tienes todos los datos
// !Se ejecuta del lado del servidor

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

	const urlImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world';

	const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => ({
		...pokemon,
		id: `${index + 1}`,
		img: `${urlImage}/${index + 1}.svg`,
	}));

	return {
		props: {
			pokemons,
		},
	};
};

export default HomePage;
