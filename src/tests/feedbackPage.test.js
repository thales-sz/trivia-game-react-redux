import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App.js';

const smartState = {
  player: { 
    name: 'Smart',
    assertions: 4,
    score: 200,
    gravatarEmail: '',
    profileImage: 'https://www.gravatar.com/avatar/433cad977104fce163b42dd7876e0d96',
  }
}

const dumbState = {
  player: { 
    name: 'Dumb',
    assertions: 1,
    score: 20,
    gravatarEmail: '',
    profileImage: 'https://www.gravatar.com/avatar/433cad977104fce163b42dd7876e0d96',
  }
}

describe('Testes da pagina de feedbakc', () => {
  test('Verifica o funcionamento até a pagina de feedbakc', () => {
    const { history } = renderWithRouterAndRedux(<App/>, smartState, '/feedback');
    const headerImg = screen.getByRole('img', {name: /imagem de perfil/i});
    expect(headerImg).toBeInTheDocument()
    const userMsg = screen.getByRole('heading', {name: /well done!/i})
    expect(userMsg).toBeInTheDocument()
  })
  test('Verifica o funcionamento do botão ranking', () => {
    const { history } = renderWithRouterAndRedux(<App/>, smartState, '/feedback');
    const buttonRanking = screen.getByRole('button', { name: /ver ranking/i})
    expect(buttonRanking).toBeInTheDocument();
    userEvent.click(buttonRanking);
    expect(history.location.pathname).toBe('/ranking');
  })
  test('Verifica o funcionamento do botão JOGAR NOVAMENTE', () => {
    const { history } = renderWithRouterAndRedux(<App/>, dumbState, '/feedback');
    const buttonPlayAgain = screen.getByRole('button', { name: /jogar novamente/i })
    expect(buttonPlayAgain).toBeInTheDocument();
    userEvent.click(buttonPlayAgain);
    expect(history.location.pathname).toBe('/');
  })
})