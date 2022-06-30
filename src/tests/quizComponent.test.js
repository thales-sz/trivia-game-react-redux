import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';

describe('Verifica componente QUIZ', () => {
  test('', () => {
    renderWithRouterAndRedux(<Game/>);
  })
})