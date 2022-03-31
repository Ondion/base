import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('1. Teste o componente <App.js />', () => {
  test(
    'test: O primeiro link deve possuir o texto Home',
    () => {
      renderWithRouter(<App />);

      const appLinks = screen.getAllByRole('link');
      expect(appLinks[0]).toHaveTextContent(/home/i);
    },
  );

  test(
    'test: O segundo link deve possuir o texto About',
    () => {
      renderWithRouter(<App />);

      const appLinks = screen.getAllByRole('link');
      expect(appLinks[1]).toHaveTextContent(/about/i);
    },
  );

  test(
    'test: O terceiro link deve possuir o texto Favorite Pokémons',
    () => {
      renderWithRouter(<App />);

      const appLinks = screen.getAllByRole('link');
      expect(appLinks[2]).toHaveTextContent(/favorite pokémons/i);
    },
  );

  test(
    `test: Teste se a aplicação é redirecionada para a página inicial,
    na URL / ao clicar no link Home da barra de navegação`,
    () => {
      const { history } = renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: 'Home' });
      userEvent.click(homeLink);
      expect(history.location.pathname).toEqual('/');
    },
  );

  test(
    `test: Teste se a aplicação é redirecionada para a página de About,
    na URL /about, ao clicar no link About da barra de navegação`,
    () => {
      const { history } = renderWithRouter(<App />);

      const aboutLink = screen.getByRole('link', { name: 'About' });
      userEvent.click(aboutLink);
      expect(history.location.pathname).toEqual('/about');
    },
  );

  test(
    `test: Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
    na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`,
    () => {
      const { history } = renderWithRouter(<App />);

      const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(favoritesLink);
      expect(history.location.pathname).toEqual('/favorites');
    },
  );

  test(
    `test: Teste se a aplicação é redirecionada para a página Not Found
    ao entrar em uma URL desconhecida`,
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/404');
      const notFoundText = screen.getByRole('heading',
        { name: 'Page requested not found Crying emoji' });
      expect(notFoundText).toBeInTheDocument();
    },
  );
});
