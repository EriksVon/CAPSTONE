import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const Money = ({ title, colorStrong }) => {
  const [open, setOpen] = useState(false);
  const [transitions, setTransitions] = useState([]);
  // array of objects {from: "Giacomo", to: "Marina", amount: 10}
  const [selectedPayers, setSelectedPayers] = useState([]);
  const [selectedReceivers, setSelectedReceivers] = useState([]);
  const [amount, setAmount] = useState(0);

  const openModal = () => {
    setOpen(true);
    setSelectedPayers(selectedPayers);
    setSelectedReceivers(selectedReceivers);
    setAmount(amount);
    setTransitions(transitions);
  };

  const partecipants = [
    { name: "Giacomo" },
    { name: "Marina" },
    { name: "Aldo" },
    { name: "Giovanni" },
  ];

  return (
    <>
      <div className="toolsWrapper">
        <h5>{title}</h5>
        <div className="toolsContainer" style={{ borderColor: colorStrong }}>
          <button
            onClick={openModal}
            style={{ backgroundColor: colorStrong }}
            className="my-2"
          >
            Aggiungi una spesa
          </button>
          <div>
            <br />
            <div>
              Last operations:
              <ul>
                {transitions.map((transition, i) => {
                  return (
                    <li key={i}>
                      {transition.from} deve dare {transition.amount} a{" "}
                      {transition.to.join(", ")}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              Saldo:
              {/* si aggiorna ogni volta che aggiungo una spesa */}
            </div>
            <button>{/* si apre modale con ultime transizioni */}</button>
          </div>

          <Modal show={open} onHide={() => setOpen(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Aggiungi una spesa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Chi deve dare dei soldi?</h5>
              {partecipants.map((part, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    id={`payer-${part.name}`}
                    name="payer"
                    onChange={() => setSelectedPayers([part])}
                  />
                  {part.name}
                </div>
              ))}
              <br />
              <h5>A chi li deve dare?</h5>
              {partecipants.map((part, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    id={`receiver-${part.name}`}
                    name="receiver"
                    onChange={() => setSelectedReceivers([part])}
                  />
                  {part.name}
                </div>
              ))}
              <h5>Quanto deve dare?</h5>
              <input
                type="text"
                name=""
                id="amount"
                placeholder="$"
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button onClick={() => console.log("ciao")}>Calcola</Button>
            </Modal.Body>
          </Modal>
        </div>

        <button
          className="coralBgButton"
          style={{ backgroundColor: colorStrong }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default Money;
