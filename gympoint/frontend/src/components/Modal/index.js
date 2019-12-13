import React from 'react';
import ReactModal from 'react-modal';

// import { Container } from './styles';

export default function Modal(props) {
  return (
    <>
      <ReactModal
        {...props}
        parentSelector={() => document.querySelector('#modal')}
        contentLabel="Example Modal"
        style={{
          overlay: {
            background: 'rgba(0, 0, 0, 0.7)',
          },
          content: {
            width: '450px',
            minHeight: '425px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'relative',
          },
        }}
      >
        <>
          <a className="modal-close" onClick={props.onCloseModal}>
            <i className="fa fa-times-circle" aria-hidden="true" />
          </a>
          {props.children}
        </>
      </ReactModal>
    </>
  );
}
