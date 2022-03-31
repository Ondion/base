import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('4. Teste o componente <NotFound.js', () => {
  test(`test: Teste se página contém um heading h2 com o texto
  Page requested not found 😭;`, () => {
    render(<NotFound />);

    const notFoundText = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(notFoundText).toBeInTheDocument();
  });

  test('test: Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);

    const imgPoke = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(imgPoke.src).toEqual(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
