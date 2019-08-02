import React from 'react';
import RadioButton from 'components/RadioButton';
import RadioButtonGroup from 'components/RadioButtonGroup';
import facebookPixel from 'utils/facebook';
import PropTypes from 'prop-types';
import './styles.scss';

const categories = [
  {
    id: 1,
    name: 'Nuevos',
    filterName: 'is_new',
  },
  {
    id: 3,
    name: 'Gratis',
    filterName: 'is_free',

  },
  {
    id: 4,
    name: 'Próximamente',
    filterName: 'release_date',
  }
];


const facebookPixelHandler = categoryId => {
  const categoryFound = categories.find(category => String(category.id) === categoryId);
  facebookPixel.filter({
    filter_type: 'category',
    filter_value: categoryFound ? categoryFound.name : 'Todas las categorias'
  });
};

const getAvailableCategories = courses => {
  return categories.filter(category => (courses.filter(course => course[category.filterName])).length > 0);
};

const CategoryFilter = ({
  name, onChange, value, courses
}) => {
  const showCategories = courses && courses.length > 0 ? getAvailableCategories(courses) : categories;
  return (
    <div className="category-filter">
      <RadioButtonGroup
        name={name}
        title="Categorías"
        onChange={e => {
          facebookPixelHandler(e);
          onChange(e);
        }}
        value={value}
      >
        <RadioButton value="" label="Todos" />

        {showCategories.map(category => (
          <RadioButton value={category.id} label={category.name} />
        ))}

      </RadioButtonGroup>
    </div>
  );
};

CategoryFilter.propTypes = {
  name: PropTypes.string,
  /**
   * Gets called when the user clicks on the any option
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  onChange: PropTypes.func,
  /**
   * Expects the onChange value
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default CategoryFilter;
