import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App.js';

afterEach(cleanup);

const SUCCESS = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
};

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
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(SUCCESS),
    });
    
    const { history } = renderWithRouterAndRedux(<App/>);

    // Pega e verifica os botões
    const playBtn = screen.getByRole('button', { name: /play/i });
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(playBtn).toBeInTheDocument();

    // Insere os inputs
    userEvent.type(inputName, 'NomeGenerico');
    userEvent.type(inputEmail, 'email@email.com');
    userEvent.click(playBtn);

    // Página game
    const playerName = await screen.findByTestId('input-player-name');
    expect(history.location.pathname).toBe("/game");
  })
  test('Verifica o botão de configuração', () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    const settingsBtn = screen.getByRole('button', { name: /configurações/i });
    expect(settingsBtn).toBeInTheDocument();
    userEvent.click(settingsBtn);
    expect(history.location.pathname).toBe('/settings');
  })
})