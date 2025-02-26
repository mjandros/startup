import React from 'react';

import { Button } from 'react-bootstrap';
import { delay } from './delay';
import { GameEvent, GameNotifier } from './gameNotifier';
import './play.css';

export function BlackjackGame(props) {
   const userName = props.userName;
   const [numCards, setNumCards] = React.useState(0);
   const [numDealerCards, setNumDealerCards] = React.useState(0);
   const [values, setValues] = React.useState([0]);
   const [dealerValues, setDealerValues] = React.useState([0]);
   const [total, setTotal] = React.useState(0);
   const [dealerTotal, setDealerTotal] = React.useState(0);
   const [status, setStatus] = React.useState("Place wager");
   const [ready, setReady] = React.useState(false);
   const [wager, setWager] = React.useState(1);
   const [wallet, setWallet] = React.useState(1000);
   const [firstTurn, setFirstTurn] = React.useState(true);

  function updateValues(index, newVal) {
    setValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = newVal;
        return updatedValues;
    });
  }

  function updateDealerValues(index, newVal) {
    setDealerValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = newVal;
        return updatedValues;
    });
  }

  function updateNumCards(prevNum) {
    const updatedNum = prevNum + 1;
    setNumCards(updatedNum);
  }

  function updateNumDealerCards(prevNum) {
    const updatedNum = prevNum + 1;
    setNumDealerCards(updatedNum);
  }

  function updateWallet(value) {
    const updatedValue = value;
    setWallet(updatedValue);
  }

  function updateTotal() {
    let newTotal = 0;
    for (const val of values) {
        newTotal += val;
    }
    const updatedTotal = newTotal;
    setTotal(updatedTotal);
  }

  function updateDealerTotal() {
    let newTotal = 0;
    for (const val of dealerValues) {
        newTotal += val;
    }
    const updatedTotal = newTotal;
    setDealerTotal(updatedTotal);
  }

  function updateStatus(newStatus) {
    if (total == 21) {
        newStatus = "Blackjack!";
        setReady(false);
    }
    else if (total > 21) {
        newStatus = "Bust!";
        setReady(false);
    }
    if (!ready) {
        newStatus = "Place wager";
    }
    const updatedStatus = newStatus;
    setStatus(updatedStatus);
  }

  React.useEffect(() => {
    updateTotal();
  }, [values]);

  React.useEffect(() => {
    updateDealerTotal();
  }, [dealerValues]);

  React.useEffect(() => {
    updateStatus("");
  }, [total]);

  React.useEffect(() => {
    startGame();
  }, [status]);

  function placeWager() {
    if (wager > wallet || wager < 1) {
        return;
    }
    setReady(true);
    setStatus();
  }

  function startGame() {
    if (!ready) {
        return;
    }
    setFirstTurn(true);
    dealCard();
    dealCard();
    dealDealerCard();
    dealDealerCard();
  }

  function dealCard() {
    if (!ready) {
        return;
    }
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
    updateValues(numCards, val);
  }

  function dealDealerCard() {
    updateNumDealerCards(numDealerCards);
    const space = document.getElementById("d" + (numCards + 1).toString());
    if (space.classList.contains("empty")) {
        space.classList.replace("empty", "space");
    }
    space.classList.replace("space", "card")
    let val = getRandomValue();
    while (!isValid(val)) {
        val = getRandomValue();
    }
    updateDealerValues(numDealerCards, val);
  }

  function getRandomValue() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function isValid(val) {
    let count = 0;
    for (const num of values) {
        if (num == val) {
            count++;
        }
    }
    for (const num of dealerValues) {
        if (num == val) {
            count++;
        }
    }
    if (count >= 4) {
        return false
    }
    return true;
  }

  function hit() {
    if (!ready) {
        return;
    }
    setFirstTurn(false);
    dealCard();
  }

  function stand() {
    setReady(false);
  }
  
  function doubleDown() {
    setFirstTurn(false);
    const input = document.getElementById("wager");
    input.disabled = false;
    input.value = wager * 2;
    input.disabled = true;
    setWager(wager * 2);
  }

  function surrender() {
    updateWallet(wallet - (wager / 2))
    endGame();
  }

  function bust() {

  }

  function blackjack() {

  }

  function endGame() {
    const input = document.getElementById("wager");
    input.disabled = false;
    input.value = 1;
    setReady(false);
    for (let i = 1; i <= 11; i++) {
        const card = document.getElementById(i.toString());
        const dcard = document.getElementById("d" + i.toString());
        if (card.classList.contains("card")) {
            card.classList.replace("card", "empty");
        }
        if (dcard.classList.contains("card")) {
            dcard.classList.replace("card", "empty");
        }
    }
    setValues([0]);
    setDealerValues([0]);
    setNumCards(0);
    setNumDealerCards(0);
    setTotal(0);
    setDealerTotal(0);
    GameNotifier.broadcastEvent(userName, GameEvent.Start, {});
  }

  return (
    <main className="playMain">
            <section className="left">
                <section className="sub">
                    <p>Welcome, {userName}.</p>
                    <br />
                    <label for="wallet">Your Wallet:</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input type="text" id="wallet" value={wallet} readonly />
                    </div>
                </section>
                <section className="sub">
                    <ul className="notification">
                        <li className="player-name">Don just earned $700!</li>
                        <li className="player-name">Michael just lost $2500.</li>
                        <li className="player-name">Nicolas is now in debt.</li>
                    </ul>
                </section>
                <section className="sub">
                    <div>
                            <div>
                                <label for="wager">Your Wager:</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">$</span>
                                    <input id="wager" type="number" min="1" max={wallet} defaultValue="1" onChange={(e) => setWager(Number(e.target.value))} disabled={ready}/>
                                </div>
                                <button onClick={placeWager}>Place</button>
                            </div>
                    </div>
                </section>
            </section>
            <br />
            <section className="right">
                <p className="deck"></p>
                <p className="empty" id="d1">{!ready && <span>{dealerValues[0]}</span>}</p>
                <p className="empty" id="d2">{dealerValues[1]}</p>
                <p className="empty" id="d3">{dealerValues[2]}</p>
                <p className="empty" id="d4">{dealerValues[3]}</p>
                <p className="empty" id="d5">{dealerValues[4]}</p>
                <p className="empty" id="d6">{dealerValues[5]}</p>
                <p className="empty" id="d7">{dealerValues[6]}</p>
                <p className="empty" id="d8">{dealerValues[7]}</p>
                <p className="empty" id="d9">{dealerValues[8]}</p>
                <p className="empty" id="d10">{dealerValues[9]}</p>
                <p className="empty" id="d11">{dealerValues[10]}</p>
                <br />
                <div>
                    {ready && <button onClick={hit}>Hit</button>}
                    {ready && <button onClick={stand}>Stand</button>}
                    {ready && firstTurn && <button onClick={doubleDown}>Double Down</button>}
                    {ready && firstTurn && <button onClick={surrender}>Surrender</button>}
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
        </main>

  );
}
