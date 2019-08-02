import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setSearchLessonValue } from 'reducers/auth';
import searchIcon from 'assets/images/icons/search.png';
import { withRouter } from 'next/router';
import { Checkbox, CheckboxContainer, CheckboxLabel } from './styles';
import './styles.scss';

class Searchbar extends PureComponent {
  state = {
    value: '',
    checkedLesson: false,
    pristineSearch: true,
  };


  static getDerivedStateFromProps(props, state) {
    const { router } = props;
    const { pristineSearch } = state;

    if (pristineSearch) {
      if (router.pathname === '/CourseDetail') { return { checkedLesson: true }; }
      return { checkedLesson: false };
    }
  }

  cleanSearch = () => this.setState({ value: '' });

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  searchOnLesson(value) {
    const { setSearchValue, isMobile, toggleSearchBar } = this.props;

    setSearchValue(value);

    if (isMobile) {
      document.querySelector('#class-list-course').scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });

      toggleSearchBar();
    }
  }

  render() {
    const { value, checkedLesson } = this.state;

    const {
      onEnter, isDark, router, setSearchValue, isMobile
    } = this.props;

    return (
      <div className="container-search-bar">
        <input
          className={isDark ? 'dark-search-bar' : 'search-bar-general'}
          type="text"
          placeholder={isMobile ? 'Buscar en este curso' : 'Quiero estudiar..'}
          onKeyPress={e => {
            if (!checkedLesson) {
              onEnter(e);
            } else if (e.key === 'Enter') {
              this.searchOnLesson(value);
              }
          }}
          onChange={this.handleChange}
          value={value}
        />
        {
          router.pathname === '/CourseDetail' && (
            <CheckboxContainer
              onClick={() => {
              this.setState({ checkedLesson: !checkedLesson, pristineSearch: false, });
             }}
            >
              <Checkbox
                checked={checkedLesson}
                style={{
                  background: 'blue'
                }}
              />
              <CheckboxLabel>En este curso</CheckboxLabel>
            </CheckboxContainer>
          )
        }
        {/*
          TODO: Refactor onClick, use ref
        */}
        <div
          role="presentation"
          className="icon-search-bar-general"
          onClick={() => {
            if (!checkedLesson) {
              onEnter({ key: 'Enter', target: { value } });
            } else {
              this.searchOnLesson(value);
            }
        }}
        >
          <img alt="icon" src={searchIcon} style={{ cursor: 'pointer' }} />
        </div>
      </div>
    );
  }
}

Searchbar.propTypes = {
  onEnter: PropTypes.func,
  isDark: PropTypes.bool
};


const mapDispatchToProps = {
  setSearchValue: value => setSearchLessonValue(value),
};


const mapStateToProps = ({ auth }) => ({
  searchValue: auth.searchValue,
});


export default compose(connect(mapStateToProps, mapDispatchToProps))(withRouter(Searchbar));
