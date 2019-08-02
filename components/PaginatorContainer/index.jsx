import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Paginator from 'components/Paginator';
import './styles.scss';

class PaginatorContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    itemsPerPage: PropTypes.number,
    itemsNumber: PropTypes.number,
    activePage: PropTypes.number
  };

  static defaultProps = {
    itemsPerPage: 24,
    itemsNumber: 0
  };

  state = {
    activePage: this.props.activePage
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ activePage: nextProps.activePage });
  }

  selectPage = value => {
    this.props.onPageSelect(value);
  };

  render() {
    const { activePage } = this.state;

    const { children, itemsNumber, itemsPerPage } = this.props;

    const numberPages = ~~(itemsNumber / itemsPerPage) + (itemsNumber % itemsPerPage ? 1 : 0);

    return (
      <div className="paginator-container">
        {children}
        {numberPages > 0 && (
          <Paginator activePage={activePage} numberPages={numberPages} onSelectItem={this.selectPage} />
        )}
      </div>
    );
  }
}

export default PaginatorContainer;
