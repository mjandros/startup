import React from 'react';

import { Button } from 'react-bootstrap';
import { delay } from './delay';
import { GameEvent, GameNotifier } from './gameNotifier';
import './play.css';

export function BlackjackGame(props) {
   const userName = props.userName;
   const [numCards, setNumCards] = React.useState(0);
   const [values, setValues] = React.useState([0]);
   const [total, setTotal] = React.useState(0);
   const [status, setStatus] = React.useState("");

  function updateValue(index, newVal) {
    setValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = newVal;
        return updatedValues;
    });
  }

  function updateNumCards(prevNum) {
    const updatedNum = prevNum + 1;
    setNumCards(updatedNum);
  }

  function updateTotal() {
    let newTotal = 0;
    for (const val of values) {
        newTotal += val;
    }
    const updatedTotal = newTotal;
    setTotal(updatedTotal);
    
  }

  function updateStatus() {
    let newStatus = "";
    if (total == 21) {
        newStatus = "Blackjack!";
    }
    else if (total > 21) {
        newStatus = "Bust!";
    }
    const updatedStatus = newStatus;
    setStatus(updatedStatus);
  }

  React.useEffect(() => {
    updateTotal();
  }, [values]);

  React.useEffect(() => {
    updateStatus();
  }, [total]);

  function dealCard() {
    updateNumCards(numCards);
    const space = document.getElementById((numCards + 1).toString());
    if (space.classList.contains("empty")) {
        space.classList.replace("empty", "space");
    }
    space.classList.replace("space", "card")
    let val = getRandomValue();
    while (!isValid(val)) {
        val = getRandomValue();
    }
    updateValue(numCards, val);
  }

  function getRandomValue() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function isValid(val) {
    let count = 0;
    for (let i = 0; i < values.length; i++) {
        if (values[i] == val) {
            count++;
        }
    }
    if (count >= 4) {
        return false
    }
    return true;
  }

  function bust() {

  }

  function blackjack() {

  }


  async function reset() {

    GameNotifier.broadcastEvent(userName, GameEvent.Start, {});
  }

  return (
    <section className="right">
                <p className="deck"></p>
                <p className="card"></p>
                <p className="card"></p>
                <br />
                <div>
                    <button onClick={dealCard}>Hit</button>
                    <button>Stand</button>
                    <button>Double Down</button>
                    <button>Surrender</button>
                </div>
                <p className="status">{status}</p>
                    <label for="total">Current Total:</label>
                    <input type="text" id="total" value={total} readonly />                    
                <br />
                <div className="space" id="1">{values[0]}</div>
                <div className="space" id="2">{values[1]}</div>
                <div className="space" id="3">{values[2]}</div>
                <div className="space" id="4">{values[3]}</div>
                <div className="empty" id="5">{values[4]}</div>
                <div className="empty" id="6">{values[5]}</div>
                <div className="empty" id="7">{values[6]}</div>
                <div className="empty" id="8">{values[7]}</div>
                <div className="empty" id="9">{values[8]}</div>
                <div className="empty" id="10">{values[9]}</div>
                <div className="empty" id="11">{values[10]}</div>
            </section>
  );
}
