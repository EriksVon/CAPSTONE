import React from "react";
import SingleDay from "./SingleDay";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";

const AddEvent = ({
  selectedDay,
  setModalState,
  colorStronger,
  format,
  modalState,
  todayEvents,
  handleModal,
  addEvent,
  deleteEvent,
}) => {
  return (
    <Modal show={modalState} onHide={() => handleModal(selectedDay, [])}>
      <Modal.Header className="d-flex justify-content-between">
        <Modal.Title>
          {selectedDay && format(selectedDay, "EEEE, d MMMM")}
        </Modal.Title>
        <XLg onClick={() => setModalState(!modalState)} />
      </Modal.Header>
      <Modal.Body>
        <Container>
          <h6> Add event:</h6>
          <Row>
            <Col sm={4}>
              <Form.Control
                size="sm"
                type="time"
                placeholder="10:30"
                id="time"
              />
            </Col>
            <Col sm={6}>
              <Form.Control
                size="sm"
                placeholder="Description"
                required
                id="title"
              />
            </Col>

            <Col sm={2}>
              <Button
                onClick={addEvent}
                style={{
                  backgroundColor: colorStronger,
                  border: "none",
                }}
              >
                Add
              </Button>
            </Col>

            <Col xs={12}>
              {todayEvents.map((event, eventIndex) => (
                <>
                  <h6 className="mt-3">Your events for today: </h6>
                  <SingleDay
                    key={`event-${eventIndex}`}
                    event={event}
                    eventIndex={eventIndex}
                    colorStronger={colorStronger}
                    deleteEvent={deleteEvent}
                  />
                </>
              ))}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default AddEvent;
