import React from 'react';

import { Button } from 'react-bootstrap';
import { delay } from './delay';
import { GameEvent, GameNotifier } from './gameNotifier';
import './play.css';

export function BlackjackGame(props) {
   const userName = props.userName;
   const [numCards, setNumCards] = React.useState(0);
   const [numDealerCards, setNumDealerCards] = React.useState(0);
   const [values, setValues] = React.useState([]);
   const [dealerValues, setDealerValues] = React.useState([]);
   const [total, setTotal] = React.useState(0);
   const [dealerTotal, setDealerTotal] = React.useState(0);
   const [status, setStatus] = React.useState("Place wager");
   const [ready, setReady] = React.useState(false);
   const [wager, setWager] = React.useState(1);
   const [wallet, setWallet] = React.useState(1000);
   const [firstTurn, setFirstTurn] = React.useState(true);
   const [test, setTest] = React.useState("init");

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

  function updateNumCards() {
    setNumCards(numCards + 1);
  }

  function updateNumDealerCards() {
    setNumDealerCards(numDealerCards + 1);
  }

  function updateWallet(value) {
    const updatedValue = wallet + value;
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
        blackjack();
    }
    else if (total > 21) {
        newStatus = "Bust!";
        bust();
    }
    if (!ready && newStatus == "") {
        newStatus = "Place wager";
    }
    else if (newStatus == "") {
        newStatus = "Your turn";
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

  React.useEffect(() => {
    dealCard();
  }, [test]);

  React.useEffect(() => {
    if (test != "init") {
        dealDealerCard();
    }
  }, [test]);

  function placeWager() {
    if (wager > wallet || wager < 1) {
        return;
    }
    updateWallet(-wager);
    setReady(true);
    setStatus("Your turn");
  }

  async function startGame() {
    if (!ready) {
        return;
    }
    setFirstTurn(true);
    dealCard();
    dealDealerCard();
    await delay(200);
    setTest("go");
  }

 function dealCard() {
    let currentNumCards = numCards + 1;
    if (!ready) {
        return;
    }
    updateNumCards();
    const space = document.getElementById((currentNumCards).toString());
    if (space.classList.contains("empty")) {
        space.classList.replace("empty", "space");
    }
    space.classList.replace("space", "card")
    let val = getRandomValue();
    while (!isValid(val)) {
        val = getRandomValue();
    }
    updateValues(currentNumCards - 1, val);
  }

 function dealDealerCard() {
    let currentNumDealerCards = numDealerCards + 1;
    updateNumDealerCards();
    const space = document.getElementById("d" + (currentNumDealerCards).toString());
    if (space.classList.contains("empty")) {
        space.classList.replace("empty", "space");
    }
    space.classList.replace("space", "card")
    let val = getRandomValue();
    while (!isValid(val)) {
        val = getRandomValue();
    }
    updateDealerValues(currentNumDealerCards - 1, val);
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
    updateStatus("Dealer's turn");
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
    updateWallet(wager / 2)
    endGame();
  }

  async function bust() {
    setReady(false);
    await delay(2500);
    endGame();
  }

  async function blackjack() {
    setReady(false);
    await delay(2500);
    updateWallet(wager * 2.5)
    endGame();
  }

  async function dealerTurn() {
    if (status != "Dealer's turn") {
        return;
    }
    while (dealerTotal < 17) {
        await delay(1000);
        dealDealerCard();
    }
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
                        <li className="player-name">{ready.toString()} just earned ${numCards}!</li>
                        <li className="player-name">{test} just lost ${values.length}.</li>
                        <li className="player-name">Nicolas is now in debt {values[0]}.</li>
                    </ul>
                </section>
                <section className="sub">
                    <div>
                            <div>
                                <label for="wager">Your Wager:</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">$</span>
                                    <input id="wager" type="number" min="1" max={wallet} defaultValue="1" onChange={(e) => setWager(Number(e.target.value))} disabled={status != "Place wager"}/>
                                </div>
                                <button onClick={placeWager} disabled={status != "Place wager"}>Place</button>
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
                <label for="total">Dealer's Total:</label>
                <input type="text" id="total" value={status == "Dealer's turn" ? dealerTotal : "--"} readonly /> 
                <div>
                    {ready && <button onClick={hit}>Hit</button>}
                    {ready && <button onClick={stand}>Stand</button>}
                    {ready && firstTurn && <button onClick={doubleDown}>Double Down</button>}
                    {ready && firstTurn && <button onClick={surrender}>Surrender</button>}
                </div>
                <div className="statusDiv">
                    <p className="status">{status}</p>
                </div>
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
