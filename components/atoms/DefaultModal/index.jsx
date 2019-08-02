import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import { modalStyles } from './styles';

const SIZES = {
  small: 320,
  medium: 560,
  large: 780
};

class Modal extends PureComponent {
  propTypes = {
    active: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    width: PropTypes.number,
    small: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool
  };

  defaultProps = {
    children: 'Add content through children nodes',
    medium: true
  };

  constructor() {
    super();
    this.state = {
      width: 0
    };
  }

  componentDidMount() {
    const modalWidth = this.getWidth();

    this.setState({ width: modalWidth });
  }

  getWidth = () => {
    const {
      small, medium, large, width
    } = this.props;

    if (small) {
      return SIZES.small;
    }

    if (medium) {
      return SIZES.medium;
    }

    if (large) {
      return SIZES.large;
    }

    if (large) {
      return width;
    }
  };

  render() {
    const { width } = this.state;
    const { active, handleClose, children } = this.props;
    return (
      <ReactModal isOpen={active} ariaHideApp={false} style={modalStyles(width)} onRequestClose={handleClose}>
        {children}
      </ReactModal>
    );
  }
}

export default Modal;
