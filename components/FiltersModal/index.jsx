import React,{ PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import Button from 'components/Button';
import CategoryFilter from 'components/CategoryFilter';
import TeachersFilter from 'components/TeachersFilter';
import closeIcon from 'assets/images/close-icon.png';
import './styles.scss';

class FiltersModal extends PureComponent {
  state = {
    categorySelected: '',
    teacherSelectedArray: [],
  };

  onCategoryChange = (value) => {
    const categorySelected = value ? parseInt(value, 10) : value;

    this.setState({ categorySelected: categorySelected !== '' ? categorySelected : categorySelected });
  };

  onTeachersChange = (teacherSelectedArray) => this.setState({ teacherSelectedArray });

  cleanTeachers = () => this.setState({ teacherSelectedArray: [] });

  render() {
    const {
      active,
      closeModal,
      onApplyFilters,
      teachers,
    } = this.props;

    const {
      categorySelected,
      teacherSelectedArray,
    } = this.state;

    return (
      <Modal
        active={active}
        hideClose={true}
        handleClose={closeModal}
        fullScreen={true}
      >
        <div className="modal-content-filters-modal">
          <div className="title-filters-modal">
            <img
              alt="close icon"
              className="icon-close close-modal-filters-modal"
              onClick={closeModal}
              src={closeIcon}
            />
            Filtros
            <Button
              styleClass="is-transparent"
              onClick={() => onApplyFilters(categorySelected, teacherSelectedArray)}
            >
              Aplicar
            </Button>
          </div>
          <div className="content-wrapper-filters-modal">
            <div className="content-filters-modal">
              <CategoryFilter
                name="modal-category-filter"
                onChange={this.onCategoryChange}
                value={categorySelected}
              />
              {
                teachers.length
                  ?
                    <TeachersFilter
                      name="modal-teacher-filter"
                      onChange={this.onTeachersChange}
                      onClean={this.cleanTeachers}
                      value={teacherSelectedArray}
                      teachers={teachers}
                      shortList={false}
                    />
                  : null
              }
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

FiltersModal.propTypes = {
  active: PropTypes.bool,
  closeModal: PropTypes.func,
  onApplyFilters: PropTypes.func,
  teachers: PropTypes.shape({}),
}

export default FiltersModal;
