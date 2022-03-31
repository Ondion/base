import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('3. Teste o componente <FavoritePokemons.js', () => {
  test(`test: Teste se é exibido na tela a mensagem No favorite
  pokemon found,se a pessoa não tiver pokémons favoritos`, () => {
    render(<FavoritePokemons />);

    const favoriteText = screen.getByText('No favorite pokemon found');
    expect(favoriteText).toBeInTheDocument();
  });

  test('test: Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const pikachuDetails = screen.getByText('More details');
    userEvent.click(pikachuDetails);

    const pokeFav = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(pokeFav);

    const favClick = screen.getByText('Favorite Pokémons');
    userEvent.click(favClick);

    const pokeFavList = screen.getByTestId('pokemon-name');
    expect(pokeFavList).toBeInTheDocument();
  });
});
