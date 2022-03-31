import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('2. Teste o componente <About.js />', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('test: Teste se a página contém as informações sobre a Pokédex', () => {
    const aboutHeading = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    const aboutText = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );

    expect(aboutHeading && aboutText).toBeInTheDocument();
  });

  test('test: Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const aboutHeading = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });

    expect(aboutHeading).toBeInTheDocument();
  });

  test('test: Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraphs = document.getElementsByTagName('p');

    expect(paragraphs.length).toBe(2);
  });

  test(`test: Teste se a página contém a seguinte imagem de uma Pokédex:
  https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`, () => {
    const imgPokedex = screen.getByRole('img');

    expect(imgPokedex.src).toEqual(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
