import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Quiz extends Component {
  state = {
    error: false,
    questions: [],
    questionNumber: 0,
    isLoading: true,
  };

  componentDidMount = async () => {
    const ERROR = 3;
    console.log(localStorage.getItem('token'));
    const { token } = JSON.parse(localStorage.getItem('token'));
    console.log(token);
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();
    if (questions.response_code === ERROR) {
      localStorage.removeItem('token');
      this.setState({ error: true });
    } else {
      this.setState({ questions: questions.results, isLoading: false });
    }
  }

  randomizeAnswers = (question) => {
    const RANDOMIZER = 0.5;
    return [...question.incorrect_answers, question.correct_answer]
      .sort(() => Math.random() - RANDOMIZER);
  }

  render() {
    const { error, questions, questionNumber, isLoading } = this.state;
    const question = questions[questionNumber];
    const answers = !isLoading && this.randomizeAnswers(question);
    const wrongAnswerMagicNumber = -1;
    let wrongAnswerCounter = wrongAnswerMagicNumber;
    return (
      <div>
        {
          error && <Redirect to="/" />
        }
        { !isLoading
                && (
                  <div>
                    <h2 data-testid="question-category">{question.category}</h2>
                    <p data-testid="question-text">{question.question}</p>
                    {answers.map((answer) => {
                      wrongAnswerCounter += 1;
                      return (
                        <button
                          type="button"
                          key={ answer }
                          data-testid={ answer === question.correct_answer
                            ? 'correct-answer' : `wrong-answer-${wrongAnswerCounter}` }
                        >
                          {answer}
                        </button>
                      );
                    })}
                  </div>
                )}
      </div>
    );
  }
}

export default Quiz;
