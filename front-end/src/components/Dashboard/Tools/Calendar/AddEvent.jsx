import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Pencil, XLg } from "react-bootstrap-icons";
import SingleEvent from "./SingleEvent";

const AddEvent = ({
  selectedDay,
  setModalState,
  format,
  modalState,
  todayEvents,
  handleModal,
  addEvent,
  deleteEvent,
  colorStrong,
  isEditing,
  modifyEvent,
  startEditing,
  editingIndex,
}) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

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
          <Row className="d-flex gap-2">
            <Col sm={4}>
              <Form.Control size="sm" type="time" id="time" />
            </Col>
            <Col sm={6}>
              <Form.Control size="sm" placeholder="Description" id="title" />
            </Col>

            <Col sm={1}>
              <Button
                onClick={addEvent}
                style={{
                  backgroundColor: colorStrong,
                  border: "none",
                }}
              >
                Add
              </Button>
            </Col>

            <Col xs={12}>
              <h6 className="mt-3">Today's events:</h6>
              {todayEvents.map((event, eventIndex) => (
                <div
                  key={`event-${eventIndex}`}
                  className="d-flex justify-content-between align-items-center gap-2"
                >
                  {!isEditing || editingIndex !== eventIndex ? (
                    <>
                      <SingleEvent event={event} colorStrong={colorStrong} />
                      <Pencil onClick={() => startEditing(eventIndex)} />
                      <XLg
                        style={{ marginLeft: "5px", cursor: "pointer" }}
                        onClick={() => deleteEvent(eventIndex)}
                      />
                    </>
                  ) : (
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder={event.title}
                        value={title}
                        className="rounded"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <input
                        type="time"
                        value={time}
                        className="rounded"
                        onChange={(e) => setTime(e.target.value)}
                      />
                      <Button
                        variant="transparent"
                        onClick={() => modifyEvent(eventIndex, title, time)}
                      >
                        Save
                      </Button>
                    </InputGroup>
                  )}
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default AddEvent;
