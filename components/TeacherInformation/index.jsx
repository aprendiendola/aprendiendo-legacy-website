import React from 'react';
import PropTypes from 'prop-types';
import TeacherStar from 'components/TeacherStar';
import teacherProfile from 'assets/images/default-teacher.svg';
import './styles.scss';

const TeacherInformation = ({ teacher }) => (
  <div>
    <span className="about-teacher-information">
SOBRE EL PROFESOR
    </span>
    <div className="information-teacher-general">
      <img src={teacher.avatar || teacherProfile} className="image-teacher-information" alt="teacher" />
      <div className="left-space-teacher-information">
        <span className="name-teacher-information">
          {teacher.name}
        </span>
        <p className="description-teacher-information">
          {teacher.bio}
        </p>
      </div>
    </div>
  </div>
);

TeacherInformation.propTypes = {
  teacher: PropTypes.object
};

export default TeacherInformation;
