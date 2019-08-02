import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from 'components/RadioButton';
import RadioButtonGroup from 'components/RadioButtonGroup';
import facebookPixel from 'utils/facebook';
import './styles.scss';

const facebookPixelHandler = (teachers, teacherId) => {
  const teacherFound = teachers.find(teacher => String(teacher.id) === teacherId);
  facebookPixel.filter({
    filter_type: 'teacher',
    filter_value: teacherFound ? teacherFound.name : 'Todas los profesores'
  });
};

const TeachersFilter = ({
  name, teachers, onChange, value, shortList, onShowMore, isLoading
}) =>
  teachers.length > 0 && (
    <div className="teacher-filter">
      <RadioButtonGroup
        name={name}
        title="Profesores"
        onChange={e => {
          facebookPixelHandler(teachers, e);
          onChange(e);
        }}
        value={value}
        isLoading={isLoading}
      >
        <RadioButton value="" label="Todos" />
        {teachers.map(teacher => (
          <RadioButton key={teacher.id} value={String(teacher.id)} label={teacher.name} />
        ))}
      </RadioButtonGroup>
      {shortList > 5 && (
        <span className="teacher-more" onClick={() => onShowMore()} role="presentation">
          {teachers.length > 5 ? 'Ver menos' : 'Ver más'}
        </span>
      )}
    </div>
  );

TeachersFilter.propTypes = {
  name: PropTypes.string,
  teachers: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string,
  shortList: PropTypes.number,
  onShowMore: PropTypes.func,
  isLoading: PropTypes.bool
};

TeachersFilter.defaultProps = {
  isLoading: false
};

export default TeachersFilter;
