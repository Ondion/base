import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const click = screen.getByRole('link', { name: 'More details' });
    userEvent.click(click);
  });

  test(`test: Teste se as informações detalhadas do Pokémon
  selecionado são mostradas na tela`, () => {
    const nameDetail = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(nameDetail).toBeInTheDocument();

    const clickDetail = screen.queryByRole('link', { name: 'More details' });
    expect(clickDetail).not.toBeInTheDocument();

    const nameSummary = screen.getByRole('heading', { name: 'Summary' });
    expect(nameSummary).toBeInTheDocument();

    const nameSpec = screen.getByText(/This intelligent Pokémon/i);
    expect(nameSpec).toBeInTheDocument();

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument('');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  test(`test: Teste se existe na página uma seção com os mapas
  contendo as localizações do pokémon`, () => {
    const h2Location = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(h2Location).toBeInTheDocument();

    const locationName = document.getElementsByTagName('em');
    expect(locationName[0]).toBeInTheDocument();
    expect(locationName[1]).toBeInTheDocument();

    const iHateLint = 'Pikachu location';
    const mapsImg = screen.getAllByRole('img', { name: iHateLint });
    expect(mapsImg[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapsImg[0]).toHaveAttribute('alt', iHateLint);

    expect(mapsImg[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(mapsImg[1]).toHaveAttribute('alt', iHateLint);
  });

  test(`test: Teste se o usuário pode favoritar um pokémon
  através da página de detalhes`, () => {
    const lint = 'Pikachu is marked as favorite';

    const favCheck = screen.getByText('Pokémon favoritado?');
    expect(favCheck).toBeInTheDocument();

    userEvent.click(favCheck);
    let imgStar = screen.queryByRole('img', { name: lint });
    expect(imgStar).toBeInTheDocument();

    userEvent.click(favCheck);
    imgStar = screen.queryByRole('img', { name: lint });
    expect(imgStar).not.toBeInTheDocument();

    userEvent.click(favCheck);
    imgStar = screen.queryByRole('img', { name: lint });
    expect(imgStar).toBeInTheDocument();

    expect(favCheck).toHaveTextContent('Pokémon favoritado?');
  });
});
