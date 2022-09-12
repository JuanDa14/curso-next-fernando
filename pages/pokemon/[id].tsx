import { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';

import { Layout } from '../../components/layouts';
import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces';
import { Grid, Card, Text, Button, Container } from '@nextui-org/react';

interface Props {
	pokemon: Pokemon;
}

const PokemonPage: FC<Props> = ({ pokemon }) => {
	return (
		<Layout title=''>
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
							<Button color={'gradient'} ghost>
								Guardar en favoritos
							</Button>
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

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const pokemons151 = Array.from({ length: 151 }, (_, i) => `${i + 1}`);

	return {
		// paths: [
		// 	{
		//? le dices la cantidad de paths que quieres que se generen
		// 		params: { id: '1' },
		// 	},
		// ],
		paths: pokemons151.map((id) => ({
			params: { id },
		})),
		//? si el url no fue renderizado(no existe) mostrara un 404 => FALSE
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { id } = params as { id: string };

	const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

	//! solo almacenar la data que vas a utilizar

	return {
		props: {
			pokemon: data,
		},
	};
};

export default PokemonPage;
