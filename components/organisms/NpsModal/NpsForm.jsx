import React from 'react';
import { Formik, Field } from 'formik';
import StarRatingComponent from 'react-star-rating-component';
import { Input, ErrorMessage } from '../../atoms';
import CircleOptions from '../../molecules/CircleOptions';
import Button from '../../atoms/large-button';

import constants from './constants';
import { Question, ButtonsWrapper, ButtonGroup, QuestionWrapper } from './styles';
import RadioButtonGroup from '../../RadioButtonGroup';
import RadioButton from '../../RadioButton';

const LARGE_MODAL = 1;

function validateStarRating(value) {
  let error;
  if (!value) {
    error = constants.MSG_STAR_RATING_ERROR;
  }
  return error;
}

function validateCircleOptions(value) {
  let error;
  if (!value) {
    error = constants.MSG_CIRCLE_OPTIONS_ERROR;
  }
  return error;
}

function StarRatingField({ field, form }) {
  return (
    <div style={{ fontSize: '22px' }}>
      <StarRatingComponent
        {...field}
        starCount={5}
        onStarClick={nextValue => {
          form.setFieldValue(field.name, nextValue);
          form.setFieldTouched(field.name, true);
        }}
        emptyStarColor={constants.COLOR_EMPTY_STAR}
      />
    </div>
  );
}

function CircleOptionsField({ field, form }) {
  return (
    <CircleOptions
      {...field}
      onClick={value => {
        form.setFieldValue(field.name, value);
        form.setFieldTouched(field.name, true);
      }}
      hintLeft={constants.TXT_UNLIKELY}
      hintRight={constants.TXT_LIKELY}
    />
  );
}

function RadioButtonsField({ field, form }) {
  return (
    <RadioButtonGroup
      {...field}
      name="hasRecommended"
      onChange={value => {
        form.setFieldValue(field.name, value);
      }}
    >
      <RadioButton value="yes" label="Sí" />
      <RadioButton value="no" label="No" />
    </RadioButtonGroup>
  );
}

function modalStructure(values, modalId) {
  const newValues = {};
  if (modalId === LARGE_MODAL) {
    const keys = Object.keys(values);
    keys.forEach(key => {
      if (key !== 'leaveAComment') {
        newValues[key] = values[key];
      }
    });
  } else {
    newValues.referRating = values.referRating;
    newValues.teacherRating = values.teacherRating;
    newValues.leaveAComment = values.leaveAComment;
  }

  return newValues;
}

const NpsForm = ({
  onSubmit, handleClose, pollId = LARGE_MODAL, teacherName, courseName
}) => (
  <Formik
    initialValues={{
      referRating: null,
      teacherRating: null,
      prevPreparation: null,
      platformBenefits: null,
      hasRecommended: null,
      recommendDescription: null,
      peopleBenefited: null,
      howToImprove: null,
      leaveAComment: null
    }}
    onSubmit={(values, { setSubmitting }) => {
      const data = modalStructure(values, pollId);

      onSubmit(data).then(() => {
        setSubmitting(false);
        handleClose();
      });
    }}
  >
    {props => {
      const {
 values, isSubmitting, touched, errors, handleChange, handleBlur, handleSubmit
} = props;

      return (
        <form onSubmit={handleSubmit}>
          <QuestionWrapper>
            <Question>{constants.LABEL_REFER_RATING(courseName)}</Question>
            <Field name="referRating" component={CircleOptionsField} validate={validateCircleOptions} />
            {errors.referRating && touched.referRating && <ErrorMessage>{errors.referRating}</ErrorMessage>}
          </QuestionWrapper>
          <QuestionWrapper>
            <Question>{constants.LABEL_TEACHER_RATING(teacherName)}</Question>
            <Field name="teacherRating" component={StarRatingField} validate={validateStarRating} />
            {errors.teacherRating && touched.teacherRating && (
              <ErrorMessage>{errors.teacherRating}</ErrorMessage>
            )}
          </QuestionWrapper>
          {pollId === LARGE_MODAL ? (
            <div>
              <QuestionWrapper>
                <Question>{constants.LABEL_PREV_PREPARATION}</Question>
                <Input
                  id="prevPreparation"
                  name="prevPreparation"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.prevPreparation}
                />
              </QuestionWrapper>
              <QuestionWrapper>
                <Question>{constants.LABEL_PLATFORM_BENEFITS}</Question>
                <Input
                  id="platformBenefits"
                  name="platformBenefits"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.platformBenefits}
                />
              </QuestionWrapper>
              <QuestionWrapper>
                <Question>{constants.LABEL_HAS_RECOMMENDED}</Question>
                <Field name="hasRecommended" component={RadioButtonsField} />
              </QuestionWrapper>
              <QuestionWrapper>
                <Question>{constants.LABEL_RECOMMEND_DESCRIPTION}</Question>
                <Input
                  id="recommendDescription"
                  name="recommendDescription"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.recommendDescription}
                />
              </QuestionWrapper>
              <QuestionWrapper>
                <Question>{constants.LABEL_PEOPLE_BENEFITED}</Question>
                <Input
                  id="peopleBenefited"
                  name="peopleBenefited"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.peopleBenefited}
                />
              </QuestionWrapper>
              <QuestionWrapper>
                <Question>{constants.LABEL_HOW_TO_IMPROVE}</Question>
                <Input
                  id="howToImprove"
                  name="howToImprove"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.howToImprove}
                />
              </QuestionWrapper>
            </div>
          ) : (
            <QuestionWrapper>
              <Question>{constants.LABEL_LEAVE_A_COMMENT}</Question>
              <Input
                id="leaveAComment"
                name="leaveAComment"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.prevPreparation}
                type="textarea"
              />
            </QuestionWrapper>
          )}

          <ButtonsWrapper>
            <ButtonGroup>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? constants.TXT_LOADING : constants.TXT_SEND}
              </Button>
              <Button outlined handleClick={() => handleClose()}>
                {constants.TXT_CANCEL}
              </Button>
            </ButtonGroup>
          </ButtonsWrapper>
        </form>
      );
    }}
  </Formik>
);

export default NpsForm;
