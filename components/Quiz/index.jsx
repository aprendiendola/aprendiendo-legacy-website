import React, { Component } from 'react';
import Modal from 'components/ModalQuiz';
import service from 'services';
import facebookPixel from 'utils/facebook';
import { connect } from 'react-redux';
import { objectCopy, findSubject } from 'utils/common';
import { Container } from './styles';
import SingleChoice from './components/SingleChoice';
import MultipleChoice from './components/MultipleChoice';

class Quiz extends Component {
  timing = 0;

  state = {
    fullScreen: false,
    show: false,
    isSubmit: false,
    userAnswers: [],
    corrects: 0,
    incorrects: 0,
    userScore: 0,
    showSuccess: false
  }

  componentDidMount() {
    const { active, course, quiz } = this.props;
    this.initTimer();
    window.addEventListener('resize', () => {
      this.resize();
    });
    this.resize();
    const { marker } = findSubject(course.markers.data, quiz.id);
    facebookPixel.quiz('StartQuiz', {
      course: course.name,
      free: quiz.is_free,
      evaluation: marker
    });

    if (active) {
      const body = document.getElementsByTagName('html')[0];
      body.style.overflowY = 'hidden';
      if (window.innerWidth <= 650) {
        return {
          fullScreen: true
        };
      }
    }
  }

  componentWillUnmount() {
    const body = document.getElementsByTagName('html')[0];
    clearInterval(this.timer);
    body.style.overflowY = 'auto';
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { quiz } = nextProps;
    if (state.userAnswers.length === 0) {
      const userAnswers = quiz.quiz.questions.map(question => {
        return {
          questionId: question.id, isCorrect: false, answers: [], value: question.value || question.weight
        };
      });
      return {
        userAnswers,
        incorrects: userAnswers.length
      };
    }

    return null;
  }

  setAnswer = newValue => {
    const { userAnswers } = this.state;
    const userCopy = objectCopy(userAnswers);
    const getIndex = userCopy.findIndex(value => value.questionId === newValue.questionId);
    userCopy[getIndex].answers = newValue.answers;
    userCopy[getIndex].isCorrect = newValue.isCorrect;
    const corrects = userCopy.filter(answer => answer.isCorrect);
    let userScore = 0;
    corrects.map(correctAnswer => {
      userScore += correctAnswer.weight || correctAnswer.value;
      return null;
    });
    return this.setState({
      userScore,
      corrects: corrects.length,
      incorrects: userAnswers.length - corrects.length,
      userAnswers: userCopy
    });
  }

  initTimer = () => {
    setInterval(() => this.timing++, 1000);
  }

  resize = () => {
    if (window.innerWidth <= 650) {
      return this.setState({
        fullScreen: true
      });
    }
    return this.setState({
      fullScreen: false
    });
  }

  submit = () => {
    const {
      isSubmit, incorrects, corrects, userAnswers
    } = this.state;
    const {
      user, quiz, course, token
    } = this.props;

    if (isSubmit) return;

    const payload = {
      incorrects,
      corrects,
      user_id: user.id,
      course_id: course.id,
      quiz_id: quiz.id,
      quiz_version: quiz.current_version,
      timing: this.timing,
      details: userAnswers
    };

    service.quizSubmission(payload, token);

    const { marker } = findSubject(course.markers.data, quiz.id);
    facebookPixel.quiz('EndQuiz', {
      course: course.name,
      free: quiz.is_free,
      evaluation: marker
    });

    this.setState({
      show: true, isSubmit: true
    }, () => {
      if (incorrects === 0) {
        this.setState({ showSuccess: true });
      }
    });
  }

  reset = () => {
    const { course, quiz } = this.props;
    const { userAnswers } = this.state;
    const userCopy = objectCopy(userAnswers);

    userCopy.map((_, index) => {
      userCopy[index].answers = [];
      return null;
    });

    this.timing = 0;

    const { marker } = findSubject(course.markers.data, quiz.id);

    facebookPixel.quiz('StartQuiz', {
      course: course.name,
      free: quiz.is_free,
      evaluation: marker
    });

    return this.setState({
      show: false, isSubmit: false, userAnswers: userCopy, userScore: 0
    });
  }

  showAnswers = () => {
    this.setState({ showSuccess: false });
  }

  render() {
    const {
      fullScreen, show, isSubmit, userAnswers, userScore, showSuccess
    } = this.state;
    const {
      active, handleClose, quiz: { quiz }, suggestions, course
    } = this.props;

    return (
      <Modal
        active={active}
        fullScreen={fullScreen}
        hideClose={false}
        handleClose={handleClose}
        isSubmit={isSubmit}
        submit={this.submit}
        reset={this.reset}
        show={show}
        userScore={userScore}
        totalScore={Number(quiz.score)}
        title={quiz.name}
        showSuccess={showSuccess}
        showAnswers={this.showAnswers}
      >
        <Container>
          {quiz.questions.map((question, index) => {
            if (question.type === 'multiple') {
              return (
                <MultipleChoice
                  title={question.name}
                  questionId={question.id}
                  options={question.options}
                  answers={question.answers}
                  number={index + 1}
                  show={show}
                  setAnswer={this.setAnswer}
                  selections={userAnswers[index] && userAnswers[index].answers}
                  suggestion={suggestions[index]}
                  course={course}
                  key={index}
                />
              );
            }
            return (
              <SingleChoice
                title={question.name}
                questionId={question.id}
                options={question.options}
                answers={question.answers}
                number={index + 1}
                show={show}
                setAnswer={this.setAnswer}
                selections={userAnswers[index] && userAnswers[index].answers}
                suggestion={suggestions[index]}
                course={course}
                key={index}
              />
            );
          })}
        </Container>
      </Modal>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  token: auth.token,
  user: auth.user
});

export default connect(mapStateToProps)(Quiz);
