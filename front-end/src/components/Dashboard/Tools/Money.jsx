import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const Money = () => {
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
  const [selectedPayer, setSelectedPayer] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [amount, setAmount] = useState("");

  const openModal = () => {
    setOpen(true);
  };

  const handleCheckboxChange = (index, type) => {
    if (type === "payers") {
      setSelectedPayer(selectedPayer === index ? null : index);
    } else {
      setSelectedRecipient(selectedRecipient === index ? null : index);
    }
  };

  const handleCalculate = () => {
    if (selectedPayer === null || selectedRecipient === null || !amount) {
      // Non sono selezionate abbastanza persone o manca l'importo, gestire l'errore
      return;
    }

    const amountPerPayer = parseFloat(amount);

    partecipants[selectedPayer].transactions.push({
      recipient: selectedRecipient,
      amount: amountPerPayer,
    });

    setAmount("");
    setSelectedPayer(null);
    setSelectedRecipient(null);
    setOpen(false);
    console.log("After calculation:", partecipants);
  };

  // Funzione per calcolare il totale per ogni partecipante
  const calculateTotal = (index) => {
    let total = 0;

    partecipants.forEach((part) => {
      part.transactions.forEach((transaction) => {
        if (transaction.recipient === index) {
          total += transaction.amount;
        }
      });
    });

    return total;
  };
  const calculateTotalExpenses = (participant) => {
    return participant.transactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);
  };

  return (
    <>
      <div>
        <div>
          {partecipants.map((part, i) => {
            const totalExpenses = calculateTotalExpenses(part);
            return (
              <div key={i}>
                {part.name} {part.surname} = {totalExpenses}
              </div>
            );
          })}

          <button onClick={openModal}>Add a spesa</button>
        </div>

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
              <input
                type="checkbox"
                checked={selectedPayer === i}
                onChange={() => handleCheckboxChange(i, "payers")}
              />{" "}
              {part.name}
            </div>
          ))}
          <br />
          <h5>A chi li deve dare?</h5>
          {partecipants.map((part, i) => (
            <div key={i}>
              <input
                type="checkbox"
                checked={selectedRecipient === i}
                onChange={() => handleCheckboxChange(i, "recipients")}
              />{" "}
              {part.name}
            </div>
          ))}
          <h5>Quanto deve dare?</h5>
          <input
            type="text"
            name=""
            id=""
            placeholder="$"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button onClick={handleCalculate}>Calcola</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Money;
