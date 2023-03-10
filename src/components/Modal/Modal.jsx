import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, Content } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.props.closeModal();
      }
    });
  }

  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { url } = this.props;
    const { onBackdropClick } = this;
    return createPortal(
      <Backdrop onClick={onBackdropClick}>
        <Content>
          <img src={url} alt="" />
        </Content>
      </Backdrop>,
      modalRoot
    );
  }
}

export default Modal;
