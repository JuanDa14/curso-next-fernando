import { FC, useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { Grid, Card, Text, Button, Container } from '@nextui-org/react';
import confetti from 'canvas-confetti';

import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';

interface Props {
	pokemon: Pokemon;
}

const PokemonPage: FC<Props> = ({ pokemon }) => {
	const [isInFavorites, setIsInFavorites] = useState(false);

	const onToggleFavorite = () => {
		localFavorites.toggleFavorite(pokemon.id);
		setIsInFavorites(!isInFavorites);

		if (isInFavorites) return;

		confetti({
			zIndex: 999,
			particleCount: 100,
			spread: 160,
			angle: -100,
			origin: { x: 1, y: 0 },
		});
	};

	useEffect(() => {
		setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
	}, [pokemon.id]);

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
							<Button color={'gradient'} ghost={!isInFavorites} onPress={onToggleFavorite}>
								{isInFavorites ? 'Remover de favoritos' : 'Guardar en favoritos'}
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
		// fallback: false,
		fallback: 'blocking', //lo deja pasar al getStaticProps
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { id } = params as { id: string };

	const pokemon = await getPokemonInfo(id);
	//! solo almacenar la data que vas a utilizar

	//? si el id pokemon no existe
	if (!pokemon) {
		return {
			redirect: {
				destination: '/',
				permanent: false, //false => puede volver a esa pagina | true => ya no puede volver a esa pagina
			},
		};
	}

	return {
		props: {
			pokemon,
		},
	};
};

export default PokemonPage;
