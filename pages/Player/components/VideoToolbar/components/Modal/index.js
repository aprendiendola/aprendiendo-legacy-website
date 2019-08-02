import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { ModalContainer, CloseContainer, Title, SubTitle, MaterialContainer, Material } from './styles';

class Modal extends Component {
  getParent = () => {
    ReactModal.setAppElement(document.getElementsByTagName('body')[0]);
    return document.querySelector('body');
  };

  getOnlyFileName = url => {
    const name = url.split('/');
    return name[name.length - 1];
  };

  render() {
    const {
      onHideModal, showModal, subTitle, materials
    } = this.props;

    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={showModal}
        parentSelector={this.getParent}
        onRequestClose={onHideModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(51, 51, 51, 0.8)',
            zIndex: 5
          },
          content: {
            height: '278px',
            minHeight: '300px',
            margin: 'auto',
            maxWidth: '445px',
            zIndex: 50
          }
        }}
      >
        <ModalContainer>
          <CloseContainer onClick={() => onHideModal()}>
            <img style={{ width: '50%' }} alt="close" src="/static/images/close-icon.png" />
          </CloseContainer>
          <Title>MATERIAL DE LA CLASE</Title>
          <SubTitle>{subTitle}</SubTitle>
        </ModalContainer>
        <MaterialContainer>
          {materials.map(value => {
            return (
              <Material href={value} target="_blank" download>
                {this.getOnlyFileName(value)}
                <img alt="download" src="/static/images/icons/download-icon.png" />
              </Material>
            );
          })}
        </MaterialContainer>
      </ReactModal>
    );
  }
}

export default Modal;
