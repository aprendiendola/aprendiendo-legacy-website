import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const PAGINATOR_LENGTH = 7;
const NUM_ITEMS_VARIABLES = PAGINATOR_LENGTH - 2;

class Paginator extends PureComponent {
  static propTypes = {
    numberPages: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,
    onSelectItem: PropTypes.func.isRequired
  };

  state = {
    pages: Array.from(new Array(this.props.numberPages), (value, index) => index + 1)
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      pages: Array.from(new Array(nextProps.numberPages), (value, index) => index + 1)
    });
  }

  renderPages = () => {
    const { pages } = this.state;

    const { activePage, numberPages, onSelectItem } = this.props;

    let paginatorItems = [];

    if (numberPages <= PAGINATOR_LENGTH) {
      paginatorItems = pages;
    } else if (activePage < 1 + NUM_ITEMS_VARIABLES) {
      paginatorItems.push(...pages.slice(0, NUM_ITEMS_VARIABLES), '...', pages[pages.length - 1]);
    } else if (1 + NUM_ITEMS_VARIABLES <= activePage && activePage <= numberPages - NUM_ITEMS_VARIABLES) {
      paginatorItems.push(
        pages[0],
        '...',
        ...pages.slice(activePage - 1, activePage + NUM_ITEMS_VARIABLES - 3),
        '....',
        pages[pages.length - 1]
      );
    } else if (numberPages - NUM_ITEMS_VARIABLES < activePage) {
      paginatorItems.push(pages[0], '...', ...pages.slice(numberPages - NUM_ITEMS_VARIABLES));
    }

    return paginatorItems.map((page, index, items) => (
      <div
        key={`page-${index}`}
        className={`page-paginator ${activePage === page ? 'is-active-paginator' : ''}`}
        onClick={() => {
          let selectedPage = page;

          if (page === '...' || page === '....') {
            const prev = items[index - 1];
            const next = items[index + 1];
            selectedPage = activePage <= prev ? prev + 1 : selectedPage;
            selectedPage = next <= activePage ? next - 1 : selectedPage;
          }

          onSelectItem(selectedPage);
        }}
      >
        {page}
      </div>
    ));
  };

  render() {
    const { activePage, numberPages, onSelectItem } = this.props;

    return (
      <div className="container-paginator">
        <span
          className="arrow-paginator"
          className="prev-icon"
          onClick={() => {
            activePage !== 1 && onSelectItem(activePage - 1);
          }}
        />
        {this.renderPages()}
        <span
          className="arrow-paginator"
          className="next-icon-paginator"
          onClick={() => {
            activePage !== numberPages && onSelectItem(activePage + 1);
          }}
        />
      </div>
    );
  }
}

export default Paginator;
