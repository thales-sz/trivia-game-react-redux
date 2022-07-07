import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPointsAction } from '../redux/actions';
import style from './question.module.css';
import Timer from './Timer';
import './Question.css';

class Question extends Component {
    state = {
      answers: [],
      answeredQuestion: false,
      timer: 30,
    };

    componentDidMount() {
      const { question } = this.props;
      this.setState({ answers: this.randomizeAnswers(question) });
    }

  randomizeAnswers = (question) => {
    const RANDOMIZER = 0.5;
    return [...question.incorrect_answers, question.correct_answer]
      .sort(() => Math.random() - RANDOMIZER);
  }

  handleClick = ({ target }) => {
    this.handleTimer();
    const { question, dispatch } = this.props;
    if (target.innerHTML === question.correct_answer) {
      const { timer } = this.state;
      const magic10 = 10;
      const points = magic10 + (timer * this.checkDifficulty());
      dispatch(getPointsAction(points));
    }
  }

  checkDifficulty = () => {
    const magic3 = 3;
    const { question } = this.props;
    switch (question.difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return magic3;
    default:
      return 0;
    }
  }

  handleTimer = () => {
    this.setState({ answeredQuestion: true });
  }

  verifyCorrectAnswer = (currentAnswer, correctAnswer) => (
    currentAnswer === correctAnswer ? style.correct_answer : style.wrong_answer
  )

  getTimer = (timer) => this.setState({ timer });

  render() {
    const { answeredQuestion, answers } = this.state;
    const { question, handleClickNextButton } = this.props;
    const wrongAnswerMagicNumber = -1;
    let wrongAnswerCounter = wrongAnswerMagicNumber;
    return (
      <div className="question-container">
        <h2 data-testid="question-category">{question.category}</h2>
        <h4 data-testid="question-text">{question.question}</h4>
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
                disabled={ answeredQuestion }
              >
                {answer}
              </button>
            );
          })}
        </div>
        <Timer
          handleTimer={ this.handleTimer }
          answeredQuestion={ answeredQuestion }
          getTimer={ this.getTimer }
        />
        { answeredQuestion
          ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ handleClickNextButton }
            >
              Next
            </button>) : null }
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleClickNextButton: PropTypes.func.isRequired,
};

export default connect()(Question);
