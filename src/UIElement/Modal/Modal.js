import React, { useState } from 'react';
import './modal.css';

const Modal = ({ error, onClose, res, closeRes }) => {
  const [show, setShow] = useState();

  const handleClose = () => {
    onClose(null);
    closeRes(null);
  };

  const showHideClassName = !!error ? 'modal display-block' : 'modal display-none';
  const errorMessage = <div><h2>Error</h2><p>{error?.message}</p><p>{error?.statusId}</p></div>
  const resMessage = <div><h2>{res?.statusId}</h2><p>{res?.message}</p></div>


  const checkMessage =  res ? resMessage : errorMessage
  
  console.log(error);

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
       {checkMessage}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
