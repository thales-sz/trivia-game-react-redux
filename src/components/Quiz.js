import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Question from './Question';

class Quiz extends Component {
  state = {
    error: false,
    questions: [],
    questionNumber: 0,
    isLoading: true,
  };

  componentDidMount = async () => {
    const ERROR = 3;
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();
    if (questions.response_code === ERROR) {
      localStorage.removeItem('token');
      this.setState({ error: true });
    } else {
      this.setState({ questions: questions.results, isLoading: false });
    }
  }

  handleClickNextButton = () => {
    const { questionNumber } = this.state;
    this.setState({
      isLoading: true,
      questionNumber: questionNumber + 1,
    }, () => {
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    const { error, questions, questionNumber, isLoading } = this.state;
    const magic4 = 4;
    return (
      <div>
        { error && <Redirect to="/" /> }
        { (questionNumber > magic4) && <Redirect to="/feedback" /> }
        {
          !isLoading && <Question
            question={ questions[questionNumber] }
            handleClickNextButton={ this.handleClickNextButton }
          />
        }

      </div>
    );
  }
}

export default Quiz;
