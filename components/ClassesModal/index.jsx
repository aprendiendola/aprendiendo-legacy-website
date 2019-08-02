import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Modal from 'components/Modal';

import ClassesList from 'components/ClassesList';
import service from 'services';
import './styles.scss';

class ClassesModal extends PureComponent {
  state = {
    data: null
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.packageId) {
      this.loadSinglePackage(nextProps.packageId);
    }
  }

  loadSinglePackage = async id => {
    try {
      const response = await service.getSinglePackage(id);
      this.setState({ data: response.data });
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { active, closeModal } = this.props;

    const { data } = this.state;
    return (
      <Modal active={active} hideClose={false} handleClose={closeModal} large fullScreen>
        <ClassesList data={data} />
      </Modal>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  token: auth.token,
  user: auth.user
});

export default compose(connect(mapStateToProps))(ClassesModal);
