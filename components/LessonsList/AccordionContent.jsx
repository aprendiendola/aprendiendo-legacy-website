import React from 'react';
import { strToSlug } from 'utils/common';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CustomLink } from 'components';
import { setUnFreezeModal } from 'reducers/auth';
import { objectCopy, normalizeString } from 'utils/common';
import './styles.scss';

const AccordionContent = ({
  course,
  subjects,
  lessonId,
  accessible,
  isAccountFreezed,
  searchValue,
  setUnFreezeModal
}) => {
  const list = subjects.map((subject, index) => {
    if (isAccountFreezed) {
      return (
        <a
          className="lesson-list-course-wrapper lesson-list-link-wrapper"
          onClick={() => setUnFreezeModal(true)}
        >
          <li className="lesson-list-course" key={index}>
            {subject.name}
          </li>
        </a>
      );
    }
    if (course) {
      return (
        <CustomLink
          key={index}
          path={
            isAccountFreezed || (accessible && course.university)
              ? `/player/${strToSlug(course.university.data.short_name)}/${course.slug}/${subject.slug}/${
                  course.id
                }/${lessonId}/${subject.id}`
              : `/planes/${course.id}`
          }
        >
          <a className="lesson-list-course-wrapper lesson-list-link-wrapper">
            <li
              className="lesson-list-course"
              key={index}
              style={
                searchValue !== ''
                  ? normalizeString(subject.name).includes(normalizeString(searchValue))
                    ? {
                        fontWeight: '900',
                        color: '#1178f2'
                      }
                    : {}
                  : {}
              }
            >
              {subject.name}
            </li>
          </a>
        </CustomLink>
      );
    }
    return (
      <div className="lesson-list-course-wrapper">
        <li className="lesson-list-course" key={index}>
          {subject.name}
        </li>
      </div>
    );
  });

  return (
    <div className="lesson-list-content">
      <ul>{list}</ul>
    </div>
  );
};

const mapDispatchToProps = {
  setUnFreezeModal: bool => setUnFreezeModal(bool)
};

const mapStateToProps = ({ auth }) => {
  return {
    freezeModalActive: auth.freezeModalActive
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccordionContent);
