import React from 'react';
import Markers from 'components/LessonsList/Markers';
import loadingImage from 'assets/images/loading.gif';

import './styles.scss';

const ClassesList = ({ data }) => (
  <div className="classes-list-modal-content">
    {data ? (
      <div>
        <div
          className="classes-list-title-wrapper"
          // TODO: If is pack, change title wrapper color to #f4f4f4
        >
          <span className="classes-list-title">
            {data.name ? data.name.toUpperCase() : ''}
          </span>
          <span className="classes-list-subtitle">
            {data.description}
          </span>
        </div>
        <div className="classes-list-content-wrapper">
          {data && <Markers course={data} showQuiz />}
        </div>
      </div>
    ) : (
      <div className="classes-list-loading-wrapper">
        <img src={loadingImage} alt="loading gif" className="classes-list-loading" />
      </div>
    )}
  </div>
);

export default ClassesList;
