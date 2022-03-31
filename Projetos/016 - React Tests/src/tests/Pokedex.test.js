import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const testID = 'pokemon-name';

const pokemons = [
  'Pikachu', 'Charmander', 'Caterpie', 'Ekans',
  'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

const pokemonsType = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

describe('5. Teste o componente <Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test(`test: Teste se página contém um heading h2
  com o texto Encountered pokémons`, () => {
    const encounteredText = screen.getByRole('heading',
      { name: 'Encountered pokémons', level: 2 });
    expect(encounteredText).toBeInTheDocument();
  });

  test(`test: Teste se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado`, () => {
    const pokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(pokemonButton).toBeInTheDocument();

    pokemons.forEach((pkm) => {
      const pokemonName = screen.getByTestId(testID);
      expect(pokemonName).toHaveTextContent(pkm);
      userEvent.click(pokemonButton);
    });

    const pokemonName = screen.getByTestId(testID);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  test('test: Teste se é mostrado apenas um Pokémon por vez', () => {
    const pokemon = screen.getAllByTestId(testID);
    expect(pokemon.length).toBe(1);
  });

  test('test: Teste se a Pokédex tem os botões de filtro', () => {
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const nextButton = screen.getByTestId('next-pokemon');
    const allButton = screen.getByRole('button', { name: 'All' });

    expect(filterButtons.length).toBe(pokemonsType.length);

    filterButtons.forEach((element, i) => {
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent(pokemonsType[i]);
      expect(allButton).toBeInTheDocument();
    });

    pokemonsType.forEach((type) => {
      const localButton = screen.getByRole('button', { name: type });
      userEvent.click(localButton);
      pokemonsType.forEach(() => {
        expect(allButton).toBeInTheDocument();
        const pokemonType = screen.getByTestId('pokemon-type');
        expect(pokemonType).toHaveTextContent(type);
        userEvent.click(nextButton);
      });
    });
  });

  test('test: Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const nextButton = screen.getByTestId('next-pokemon');
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toHaveTextContent('All');

    userEvent.click(allButton);
    pokemons.forEach((pkm) => {
      const pokemonTest = screen.getByTestId('pokemon-name');
      expect(pokemonTest).toHaveTextContent(pkm);
      userEvent.click(nextButton);
    });
  });
});
