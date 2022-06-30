import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App.js';


describe('Testa página de login', () => {
  test('Verifica se existe um botão de configuração', () => {
    renderWithRouterAndRedux(<App/>)
    const settingsBtn = screen.getByRole('button', { name: /configurações/i });
    expect(settingsBtn).toBeInTheDocument();
  })
  test('Verifica se existe um botão de PLAY', () => {
    renderWithRouterAndRedux(<App/>)
    const playBtn = screen.getByRole('button', { name: /play/i });
    expect(playBtn).toBeInTheDocument();
  })
  test('Verifica se existe os inputs de name e email', () => {
    renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email')
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  })
  test('Verifica se ao clicar no botão play é redirecionado para a página "/game"', async () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    const playBtn = screen.getByRole('button', { name: /play/i });
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(playBtn).toBeInTheDocument();
    userEvent.type(inputName, 'NomeGenerico');
    userEvent.type(inputEmail, 'email@email.com');
    userEvent.click(playBtn);
    const playerName = await screen.findByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();
    expect(history.location.pathname).toBe("/game");
  })
  test('Verifica o botão de configuração', () => {
    renderWithRouterAndRedux(<App/>)
    const settingsBtn = screen.getByRole('button', { name: /configurações/i });
    expect(settingsBtn).toBeInTheDocument();
    userEvent.click(settingsBtn);
    expect(window.location.pathname).toBe('/');
  })
})