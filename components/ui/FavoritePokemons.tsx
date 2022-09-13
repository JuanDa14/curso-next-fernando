import { Grid } from '@nextui-org/react';
import { FC } from 'react';
import { FavoriteCardPokemon } from '../pokemon/FavoriteCardPokemon';

interface Props {
	favoritesPokemons: number[];
}

export const FavoritePokemons: FC<Props> = ({ favoritesPokemons }) => {
	return (
		<Grid.Container gap={2} direction='row' justify='flex-start'>
			{favoritesPokemons.map((id) => (
				<FavoriteCardPokemon key={id} pokemonId={id} />
			))}
		</Grid.Container>
	);
};
