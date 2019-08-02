import React, { Fragment, Component } from 'react';
import playIcon from 'assets/images/play-now-icon.png';
import { areArraysEquals, strToSlug } from 'utils/common';
import { CustomLink } from 'components';
import { Container, Label, Option, Message } from './styles';

import '../../styles.scss';

class MultipleChoice extends Component {
  getQuestion = (number, title) => {
    return [title.slice(0, 3), `${number}. `, title.slice(3)].join('');
  };

  selected = e => {
    const {
      answers, setAnswer, questionId, selections
    } = this.props;
    const typeOfValue = typeof answers[0] === 'number' ? Number(e.target.value) : e.target.value;
    const getValue = selections.find(selection => typeOfValue === selection);

    if (typeOfValue === getValue) {
      return setAnswer({
        questionId,
        isCorrect: areArraysEquals(answers, selections.filter(selection => selection !== getValue)),
        answers: selections.filter(selection => selection !== getValue)
      });
    }
    if (!getValue) {
      return setAnswer({
        questionId,
        isCorrect: areArraysEquals(answers, [...selections, typeOfValue]),
        answers: [...selections, typeOfValue]
      });
    }
  };

  render() {
    const {
      title,
      options,
      number,
      show,
      selections,
      answers,
      course,
      suggestion
    } = this.props;

    return (
      <Fragment>
        <Container>
          <Label helper>
            <div dangerouslySetInnerHTML={{ __html: this.getQuestion(number, title) }} />
          </Label>
          <Label helper marginBottom="20px" marginLeft="10px">
            (Puedes seleccionar más de una respuesta)
          </Label>
          {options.map((option, index) => {
            return (
              <Option
                value={option.id}
                onClick={e => this.selected(e)}
                isSelected={selections.find(selection => selection === option.id)}
                isCorrect={
                  show &&
                  selections.length > 0 &&
                  answers.find(answer => answer === option.id) &&
                  selections.find(selection => selection === option.id)
                }
                isIncorrect={
                  show &&
                  selections.length > 0 &&
                  selections.find(selection => selection === option.id) &&
                  !answers.find(answer => answer === option.id)
                }
                disabled={show}
                key={index}
              >
                {option.value}
              </Option>
            );
          })}
          {
            suggestion && (
              <CustomLink
                path={
                  suggestion.hasAccess
                    ? `/player/${strToSlug(course.university.data.short_name)}/${suggestion.courseSlug}/${suggestion.subjectSlug}/${
                        course.id
                      }/${suggestion.lessonId}/${suggestion.subjectId}?time=${suggestion.time || 1}`
                    : `/planes/${course.id}`
                }
              >
                <div style={{ marginLeft: '10px', textAlign: 'left' }}>
                  <Message
                    isCorrect={show && areArraysEquals(selections, answers)}
                    isIncorrect={show && !areArraysEquals(selections, answers)}
                  >
                    {show &&
                      (areArraysEquals(selections, answers)
                        ? '¡Correcto!'
                        : suggestion.subjectName && 'No completaste todas las respuestas, revisa:')}
                  </Message>
                  {show && !areArraysEquals(selections, answers) && suggestion.subjectName && (
                    <Fragment>
                      <i className="icon ion-md-play" style={{ color: '#0fa3f4', fontSize: '15px' }} />
                      <Message style={{ marginLeft: '3px', cursor: 'pointer' }}>{suggestion.subjectName}</Message>
                    </Fragment>
                  )}
                </div>
              </CustomLink>
            )
          }
        </Container>
      </Fragment>
    );
  }
}

export default MultipleChoice;
