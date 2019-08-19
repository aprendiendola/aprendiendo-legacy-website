import React, { Fragment, Component } from 'react';
import { Select, Button, Label } from 'components';

class Filter extends Component {
  state = {}

  renderTeachers = () => {
    const { teachers } = this.props;
    if (!teachers) return [];

    const teachersAvailable = [{
      label: 'Todos',
      value: 'all'
    }];

    teachers.map(teacher => (teachersAvailable.push({
      label: teacher.name,
      value: teacher.id
    })));

    return (teachersAvailable);
  }

  render() {
    const {
      universities,
      onChangeUniversity,
      teachers,
      onChangeTeachers,
      onChangeCategory,
      onFilter,
      isLoggedIn
    } = this.props;

    return (
      <Fragment>
        {!isLoggedIn && (
          <div style={{ padding: 20 }}>
            <Select
              name="Universidad"
              placeholder="Seleccione Universidad"
              onChange={onChangeUniversity}
              onBlur={() => {}}
              options={universities && universities.map(university => ({
                label: university.name,
                value: university.id,
                color: university.color
              }))}
            />
          </div>
          )
        }
        <div style={{ padding: 20 }}>
          <Select
            name="Categoría"
            placeholder="Seleccione Categoría"
            onChange={onChangeCategory}
            onBlur={() => {}}
            options={[
              {
                label: 'Todas',
                value: 0,
              },
              {
                label: 'Nuevos',
                value: 1,
              },
              {
                label: 'Gratis',
                value: 3,
              },
              {
                label: 'Próximamente',
                value: 4,
              }
            ]}
          />
        </div>
        <div style={{ padding: 20 }}>
          <Select
            name="Profesor"
            placeholder="Seleccione Profesor"
            onChange={onChangeTeachers}
            onBlur={() => {}}
            options={this.renderTeachers()}
          />
        </div>
        {/* <Button onClick={onFilter}>
          <Label fontSize="16px" color="#fff" weight="black" isClickable>
            Aplicar Filtros
          </Label>
        </Button> */}
      </Fragment>
    );
  }
}

export default Filter;
