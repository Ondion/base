import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const moreDetails = 'More details';

describe('6. Teste o componente <Pokemon.js />', () => {
  test(`test: Teste se é renderizado um card com as informações de determinado
  pokémon`, () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img', { name: 'Pikachu sprite' });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');

    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');

    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test(`test: Teste se o card do Pokémon indicado na Pokédex contém um link de
  navegação para exibir detalhes deste Pokémon. O link deve possuir a URL
  /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
    renderWithRouter(<App />);

    const detailItem = screen.getByRole('link', { name: moreDetails });
    expect(detailItem).toBeInTheDocument();
    expect(detailItem).not.toHaveAttribute('href', '/');
  });

  test(`test: Teste se ao clicar no link de navegação do Pokémon, é feito o
  redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: moreDetails });
    userEvent.click(detailsLink);
    expect(history.location.pathname).toEqual('/pokemons/25');
  });

  test(`test: Teste também se a URL exibida no navegador muda para /pokemon/<id>,
  onde <id> é o id do Pokémon cujos detalhes se deseja ver`, () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: moreDetails });
    userEvent.click(details);
    expect(history.location.pathname).toEqual('/pokemons/25');
  });

  test(`test: Teste se existe um ícone de estrela nos Pokémons
  favoritados`, () => {
    renderWithRouter(<App />);

    const detailItem = screen.getByRole('link', { name: moreDetails });
    userEvent.click(detailItem);

    const pokeFav = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(pokeFav);

    const startFav = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(startFav).toHaveAttribute('src', '/star-icon.svg');
    expect(startFav).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
