import PropTypes from 'prop-types';
import React, { Component } from 'react';
import style from './question.module.css';

class Question extends Component {
  state = {
    answers: [],
    answeredQuestion: false,
  }

  componentDidMount() {
    const { question } = this.props;
    this.setState({ answers: this.randomizeAnswers(question) });
  }

  randomizeAnswers = (question) => {
    const RANDOMIZER = 0.5;
    return [...question.incorrect_answers, question.correct_answer]
      .sort(() => Math.random() - RANDOMIZER);
  }

  handleClick = () => {
    this.setState({ answeredQuestion: true });
  }

  verifyCorrectAnswer = (currentAnswer, correctAnswer) => (
    currentAnswer === correctAnswer ? style.correct_answer : style.wrong_answer
  )

  render() {
    const { answeredQuestion, answers } = this.state;
    const { question } = this.props;
    const wrongAnswerMagicNumber = -1;
    let wrongAnswerCounter = wrongAnswerMagicNumber;
    return (
      <>
        <h2 data-testid="question-category">{question.category}</h2>
        <p data-testid="question-text">{question.question}</p>
        <div data-testid="answer-options">
          {answers.map((answer) => {
            wrongAnswerCounter += 1;
            return (
              <button
                type="button"
                key={ answer }
                className={ answeredQuestion
                  ? this.verifyCorrectAnswer(answer, question.correct_answer)
                  : '' }
                data-testid={ answer === question.correct_answer
                  ? 'correct-answer' : `wrong-answer-${wrongAnswerCounter}` }
                onClick={ this.handleClick }
              >
                {answer}
              </button>
            );
          })}
        </div>
      </>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

export default Question;
