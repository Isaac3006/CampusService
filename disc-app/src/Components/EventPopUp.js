import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EventPopUp() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Click to check event details!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Event Details!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Name: Happy Halloween!</Modal.Body>
        <Modal.Body>Location: Kappa Alpha</Modal.Body>
        <Modal.Body>Date: 10/28/2022</Modal.Body>
        <Modal.Body>Time: 8:00pm</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      
    </>
  );
}

export default EventPopUp;