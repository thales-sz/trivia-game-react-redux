import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Question from '../components/Question';

const state = {
  player: { 
    name: 'Smart',
    assertions: 0,
    score: 0,
    gravatarEmail: 'smart@aaa',
    profileImage: 'https://www.gravatar.com/avatar/433cad977104fce163b42dd7876e0d96',
  }
}

const ERROR = {
  "response_code":3,
  "results":[]
}

const SUCCESS = {
  "response_code":0,
  "results":[
      {
        "category":"Entertainment: Video Games",
        "type":"multiple",
        "difficulty":"easy",
        "question":"What is the first weapon you acquire in Half-Life?",
        "correct_answer":"A crowbar",
        "incorrect_answers":[
            "A pistol",
            "The H.E.V suit",
            "Your fists"
        ]
      },
      {
        "category":"Entertainment: Video Games",
        "type":"boolean",
        "difficulty":"hard",
        "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
        "correct_answer":"False",
        "incorrect_answers":[
            "True"
        ]
      },
      {
        "category":"Entertainment: Video Games",
        "type":"multiple",
        "difficulty":"medium",
        "question":"What is the first weapon you acquire in Half-Life?",
        "correct_answer":"A crowbar",
        "incorrect_answers":[
            "A pistol",
            "The H.E.V suit",
            "Your fists"
        ]
      },
      {
        "category":"Entertainment: Video Games",
        "type":"boolean",
        "difficulty":"hard",
        "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
        "correct_answer":"False",
        "incorrect_answers":[
            "True"
        ]
      },
      {
        "category":"Entertainment: Video Games",
        "type":"multiple",
        "difficulty":"SEM DIFICULDADE",
        "question":"What is the first weapon you acquire in Half-Life?",
        "correct_answer":"A crowbar",
        "incorrect_answers":[
            "A pistol",
            "The H.E.V suit",
            "Your fists"
        ]
      },
  ]
}

afterEach(cleanup);

describe('Testa o componente Quiz', () => {
  test('Verifica erro no fetch de perguntas', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(ERROR),
    });

    renderWithRouterAndRedux(<App/>, state, '/game');

    expect(global.fetch).toBeCalled();
    const inputName = await screen.findByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
  })
  test('Verifica sucesso no fetch de perguntas', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(SUCCESS),
    });

    const { history } = renderWithRouterAndRedux(<App/>, state, '/game');

    expect(global.fetch).toBeCalled();
    const categoryText = await screen.findByTestId('question-category');
    expect(categoryText).toBeInTheDocument();

    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);

    const nextButton = screen.getByTestId('btn-next');
    userEvent.click(nextButton);

    const secondQuestion = await screen.findByRole('heading', {name: /Sentry rocket damage/});
    expect(secondQuestion).toBeInTheDocument()

    const wrongAnswer2 = screen.getByTestId(/wrong/);
    userEvent.click(wrongAnswer2);

    const nextButton2 = screen.getByTestId('btn-next');
    userEvent.click(nextButton2);
  
    const correctAnswer3 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer3);

    const nextButton3 = screen.getByTestId('btn-next');
    userEvent.click(nextButton3);

    const correctAnswer4 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer4);

    const nextButton4 = screen.getByTestId('btn-next');
    userEvent.click(nextButton4);
  
    const correctAnswer5 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer5);

    const nextButton5 = screen.getByTestId('btn-next');
    userEvent.click(nextButton5);

    const feedbackText = await screen.findByTestId('feedback-text');
    expect(feedbackText).toBeInTheDocument();
    expect(history.location.pathname).toBe('/feedback');
  })
  test('Verifica o timer', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(SUCCESS),
    });

    renderWithRouterAndRedux(<App/>, state, '/game');
    jest.setTimeout(40000);

    expect(global.fetch).toBeCalled();
    const categoryText = await screen.findByTestId('question-category');
    expect(categoryText).toBeInTheDocument();

    await waitFor(() => screen.findByTestId('btn-next'), {timeout:35000});
    const nextButton = await screen.findByTestId('btn-next');
    expect(nextButton).toBeInTheDocument();
  })
  test('Verifica a dificuldade das questões', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(SUCCESS),
    });

    renderWithRouterAndRedux(<App/>, state, '/game');

    expect(global.fetch).toBeCalled();
    const categoryText = await screen.findByTestId('question-category');
    expect(categoryText).toBeInTheDocument();

    // Acerta uma questão fácil
    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);

    const points = screen.getByTestId('header-score');
    expect(points.innerHTML).toBe('40');

    const nextButton = screen.getByTestId('btn-next');
    userEvent.click(nextButton);

    // Acerta uma questão difícil
    const secondQuestion = await screen.findByRole('heading', {name: /Sentry rocket damage/});
    expect(secondQuestion).toBeInTheDocument()

    const correctAnswer2 = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer2);

    const points2 = screen.getByTestId('header-score');
    expect(points2.innerHTML).toBe('140');

    const nextButton2 = screen.getByTestId('btn-next');
    userEvent.click(nextButton2);

    // Acerta uma questão media
    const correctAnswer3 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer3);

    const points3 = screen.getByTestId('header-score');
    expect(points3.innerHTML).toBe('210');

    const nextButton3 = screen.getByTestId('btn-next');
    userEvent.click(nextButton3);

    // Erra uma questão sem dificuldade
    const correctAnswer4 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer4);

    const points4 = screen.getByTestId('header-score');
    expect(points4.innerHTML).toBe('310');
})
})