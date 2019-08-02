import React, { Fragment, Component } from "react";
import katex from "katex";
import { strToSlug } from "utils/common";
import { CustomLink } from "components";
import { Container, Label, Option, Message, MessageContainer } from "./styles";
import { withRouter } from "next/router";
import "../../styles.scss";

class SingleChoice extends Component {
  getQuestion = (number, title) => {
    return [title.slice(0, 3), `${number}. `, title.slice(3)].join("");
  };

  selected = e => {
    const { answers, setAnswer, questionId } = this.props;
    const typeOfValue =
      typeof answers[0] === "number" ? Number(e.target.value) : e.target.value;

    setAnswer({
      questionId,
      isCorrect: answers[0] === typeOfValue,
      answers: [typeOfValue]
    });
  };

  bindKatexToHtml = html => {
    let bindedHtml = html;
    const dollarRegex = /\$(.*?)\$/g;
    let latexArr = html.match(dollarRegex);

    if (latexArr) {
      latexArr = latexArr.map(e => e.slice(1, -1));
      const formulaHtmlArr = latexArr.map(e =>
        katex.renderToString(e, {
          throwOnError: false
        })
      );

      formulaHtmlArr.forEach(element => {
        bindedHtml = bindedHtml.replace(
          /\$(.+?)\$/,
          `<span style="padding: 0px 5px">${element}</span>`
        );
      });
    }

    return bindedHtml;
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
          <Label helper style={{ marginBottom: "20px" }}>
            <div
              dangerouslySetInnerHTML={{
                __html: this.bindKatexToHtml(this.getQuestion(number, title))
              }}
            />
          </Label>
          {options.map((option, index) => {
            return (
              <Option
                value={option.id}
                onClick={e => this.selected(e)}
                isSelected={selections[0] === option.id}
                isCorrect={
                  show &&
                  selections[0] === option.id &&
                  answers.find(answer => answer === option.id)
                }
                isIncorrect={
                  show &&
                  selections[0] !== "" &&
                  selections[0] === option.id &&
                  !answers.find(answer => answer === option.id)
                }
                disabled={show}
                key={index}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.bindKatexToHtml(option.value)
                  }}
                />
              </Option>
            );
          })}
          {suggestion && (<CustomLink
            path={
              suggestion.hasAccess
                ? `/player/${strToSlug(
                    course.university.data.short_name
                  )}/${suggestion.courseSlug}/${suggestion.subjectSlug}/${
                    course.id
                  }/${suggestion.lessonId}/${suggestion.subjectId}?time=${suggestion.time || 1}`
                : `/planes/${course.id}`
            }
          >
            <MessageContainer>
              <Message
                isCorrect={
                  show && answers.find(answer => answer === selections[0])
                }
                isIncorrect={
                  show && !answers.find(answer => answer === selections[0])
                }
              >
                {show &&
                  (answers.find(answer => answer === selections[0])
                    ? "¡Correcto!"
                    : suggestion.subjectName && "Revisa:")}
              </Message>
              {show &&
                !answers.find(answer => answer === selections[0]) &&
                suggestion.subjectName && (
                  <Fragment>
                    <Message style={{ cursor: "pointer" }}>
                      <i
                        className="icon ion-md-play"
                        style={{ color: "#0fa3f4", fontSize: "15px" }}
                      />
                      {suggestion.subjectName}
                    </Message>
                  </Fragment>
                )}
            </MessageContainer>
          </CustomLink>)}
        </Container>
      </Fragment>
    );
  }
}

export default withRouter(SingleChoice);
