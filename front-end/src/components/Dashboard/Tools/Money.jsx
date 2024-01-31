import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const Money = ({ title, colorStrong }) => {
  const partecipants = [
    {
      name: "Giacomo",
      surname: "Poretti",
      transactions: [],
    },
    {
      name: "Marina",
      surname: "Massironi",
      transactions: [],
    },
    {
      name: "Aldo",
      surname: "Baglio",
      transactions: [],
    },
    {
      name: "Giovanni",
      surname: "Storti",
      transactions: [],
    },
  ];

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="toolsWrapper">
        <h5>{title}</h5>
        <div className="toolsContainer" style={{ borderColor: colorStrong }}>
          <div>
            {partecipants.map((part, i) => {
              return (
                <div key={i}>
                  {part.name} = {part.tot}
                </div>
              );
            })}

            <button onClick={openModal}>Aggiungi una spesa</button>
          </div>

          <Modal show={open} onHide={() => setOpen(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Aggiungi una spesa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Chi deve dare dei soldi?</h5>
              {partecipants.map((part, i) => (
                <div key={i}>
                  <input type="checkbox" />
                  {part.name}
                </div>
              ))}
              <br />
              <h5>A chi li deve dare?</h5>
              {partecipants.map((part, i) => (
                <div key={i}>
                  <input type="checkbox" />
                  {part.name}
                </div>
              ))}
              <h5>Quanto deve dare?</h5>
              <input type="text" name="" id="" placeholder="$" />
              <Button>Calcola</Button>
            </Modal.Body>
          </Modal>
        </div>
        <button
          className="coralBgButton"
          style={{ backgroundColor: colorStrong }}
        >
          Whatever
        </button>
      </div>
    </>
  );
};

export default Money;
