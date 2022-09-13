import { FC } from 'react';
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';

import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { Grid, Card, Text, Container } from '@nextui-org/react';
import { getPokemonInfo } from '../../utils';

interface Props {
	pokemon: Pokemon;
}

const PokemonNamePage: FC<Props> = ({ pokemon }) => {
	return (
		<Layout title={pokemon.name}>
			<Grid.Container css={{ marginTop: '5px' }} gap={2}>
				<Grid xs={12} sm={4}>
					<Card isHoverable css={{ padding: '30px' }}>
						<Card.Body>
							<Card.Image
								src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
								alt={pokemon.name}
								width='100%'
								height={200}
							/>
						</Card.Body>
					</Card>
				</Grid>
				<Grid xs={12} sm={8}>
					<Card>
						<Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
							<Text h1 transform='capitalize'>
								{pokemon.name}
							</Text>
						</Card.Header>
						<Card.Body>
							<Text size={30}>Sprites:</Text>
							<Container direction='row' display='flex' gap={0} justify='space-between'>
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
	);
};

export default PokemonNamePage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const { data } = await pokeApi.get<PokemonListResponse>('pokemon?limit=151');

	const paths = data.results.map((pokemon) => ({ name: pokemon.name }));

	return {
		paths: paths.map(({ name }) => ({
			params: { name },
		})),

		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { name } = ctx.params as { name: string };

	const pokemon = await getPokemonInfo(name);

	return {
		props: { pokemon },
	};
};
