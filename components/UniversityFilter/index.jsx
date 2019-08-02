import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from 'components/RadioButton';
import RadioButtonGroup from 'components/RadioButtonGroup';
import facebookPixel from 'utils/facebook';
import './styles.scss';

const facebookPixelHandler = (universities, universityId) => {
  const universityFound = universities.find(uni => String(uni.id) === universityId);
  facebookPixel.filter({
    filter_type: 'university',
    filter_value: universityFound ? universityFound.name : 'Todas las universidades'
  });
};

const UniversityFilter = ({
  name,
  universities,
  onChange,
  value,
  shortList,
  onShowMore,
  onSecondaryAction,
  isMobile,
  user,
  isLoading
}) => (
  <div>
    {isMobile ? (
      <div className="university-select-wrapper">
        {!user && <span className="university-select-title">Selecciona tu universidad:</span>}
        <div className="university-select-content">
          {!user && (
            <select
              className="university-select"
              value={value}
              onChange={e => {
                facebookPixelHandler(universities, e);
                onChange(e);
              }}
            >
              <option value="">Todas las universidades</option>
              {universities.map(university => (
                <option key={university.id} value={university.id}>
                  {university.name}
                </option>
              ))}
            </select>
          )}

          <span
            className={`${user ? 'university-select-button fixed-filter' : 'university-select-button'}`}
            onClick={onSecondaryAction}
            role="presentation"
          >
            Filtra tus cursos
          </span>
        </div>
      </div>
    ) : (
      <div className="university-filter">
        <RadioButtonGroup
          name={name}
          title="Universidades"
          onChange={e => {
            facebookPixelHandler(universities, e);
            onChange(e);
          }}
          value={value}
          isLoading={isLoading}
        >
          <RadioButton value="" label="Todas" />
          {universities.map(university => (
            <RadioButton key={university.id} value={university.id} label={university.name} />
          ))}
        </RadioButtonGroup>
        {shortList > 6 && (
          <span className="university-more" onClick={onShowMore} role="presentation">
            {universities.length > 6 ? 'Ver menos' : 'Ver más'}
          </span>
        )}
      </div>
    )}
  </div>
);

UniversityFilter.defaultProps = {
  name: '',
  universities: [],
  onChange: () => {},
  value: '',
  shortList: 0,
  onShowMore: () => {},
  onSecondaryAction: () => {},
  isMobile: false,
  isLoading: false
};

UniversityFilter.propTypes = {
  name: PropTypes.string,
  universities: PropTypes.arrayOf(PropTypes.shape({})),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shortList: PropTypes.number,
  onShowMore: PropTypes.func,
  onSecondaryAction: PropTypes.func,
  isMobile: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default UniversityFilter;
