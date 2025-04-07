import React from 'react';

import { Button } from 'react-bootstrap';
import { delay } from './delay';
import { GameEvent, GameNotifier } from './gameNotifier';
import { Players } from './players';
import './play.css';

export function BlackjackGame(props) {
   const userName = props.userName;
   const [numCards, setNumCards] = React.useState(0);
   const [numDealerCards, setNumDealerCards] = React.useState(0);
   const [values, setValues] = React.useState([]);
   const [dealerValues, setDealerValues] = React.useState([]);
   const [total, setTotal] = React.useState(0);
   const [aceTotal, setAceTotal] = React.useState("");
   const [dealerTotal, setDealerTotal] = React.useState(0);
   const [status, setStatus] = React.useState("Place wager");
   const [ready, setReady] = React.useState(false);
   const [wager, setWager] = React.useState(1);
   const [wallet, setWallet] = React.useState(0);
   const [firstTurn, setFirstTurn] = React.useState(true);
   const [test, setTest] = React.useState("init");
   const [earnings, setEarnings] = React.useState(0);
   const [won, setWon] = React.useState("");
   const [deck, setDeck] = React.useState("");
   const [playerCards, setPlayerCards] = React.useState([]);
   const [dealerCards, setDealerCards] = React.useState([]);
   const [dealerFirst, setDealerFirst] = React.useState("");
   const [checkAce, setCheckAce] = React.useState(true);

   React.useEffect(() => {
    async function fetchWallet() {
        try {
            const response = await fetch('/api/wallet');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setWallet(data.wallet); // Set wallet value from API
        } catch (error) {
            setError(error.message); // Handle error (optional)
            console.error("Error fetching wallet:", error);
        }
    }

    fetchWallet();
}, []);

  function updateValues(index, newVal) {
    setValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = newVal;
        return updatedValues;
    });
  }

  async function replaceValues(newVals) {
    const updatedVals = [...newVals];
    setValues(updatedVals);
  }

  // function replaceValue(index, newVal) {
  //   const newVals = [];
  //   values.forEach((element, i) => {
  //     if (i == index) {
  //       newVals.push(newVal);
  //     } else {
  //       newVals.push(element);
  //     }
  //   });
  // }

  function updateDealerValues(index, newVal) {
    setDealerValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = newVal;
        return updatedValues;
    });
  }

  function updateDealerCards(index, img) {
    setDealerCards((prevValues) => {
      let newVal = <img src={img} alt="Card" className="card-image"/>;
      if (index == 0) {
        newVal = <img src='https://www.deckofcardsapi.com/static/img/back.png' alt="Back of card" className="card-image"/>;
      }
      const updatedValues = [...prevValues];
      updatedValues[index] = newVal;
      return updatedValues;
  });
  }

  function updatePlayerCards(index, img) {
    setPlayerCards((prevValues) => {
      let newVal = <img src={img} alt="Card" className="card-image"/>;
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

  async function updateWallet(value) {
    setWallet(prevWallet => {
        const updatedValue = prevWallet + value;
        fetch('/api/wallet', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ wallet: updatedValue }),
        });

        return updatedValue;
    });
}

  async function updateTotal(check = checkAce) {
    if ((values.includes(1) || values.includes(11)) && check) {
      await updateTotalWithAce();
      return;
    }
    let newTotal = 0;
    for (const val of values) {
        newTotal += val;
    }
    const updatedTotal = newTotal;
    setTotal(updatedTotal);
  }

  async function updateTotalWithAce() {
    setCheckAce(false);
    let possibles = getAllPossible(values);
    const keysArray = Array.from(possibles.keys());
    if (keysArray.length == 0) {
      updateTotal(false);
      return;
    } else if (keysArray.length == 1) {
      setAceTotal("");
    }
    const highest = keysArray[keysArray.length - 1];
    const bestVals = possibles.get(highest);
    await replaceValues(bestVals);
  }

  function getAllPossible(values) {
    let hypoVals = [];
    let possibles = new Map();
    values.forEach(element => {
      if (element == 11) {
        hypoVals.push(1);
      } else {
        hypoVals.push(element);
      }
    });
    let hypoTotal = 0;
    hypoVals.forEach(element => {
      hypoTotal += element;
    });
    possibles.set(hypoTotal, [...hypoVals]);
    hypoVals.forEach((element, index) => {
      if (element == 1) {
        hypoVals[index] = 11;
        hypoTotal = 0;
        hypoVals.forEach(element => {
          hypoTotal += element;
        });
        possibles.set(hypoTotal, [...hypoVals]);
      }
    });
    const filtered = new Map(
      [...possibles].filter(([key, value]) => key <= 21)
    );
    return filtered;
  }

  function updateAceTotal() {
    let aceTotalStr = "";  
    let possiblesMap = getAllPossible(values);
    const possibles = Array.from(possiblesMap.keys());
    possibles.forEach((element, index) => {
      if (index == 0) {
        aceTotalStr = element;
      } else if (index != possibles.length - 1) {
        aceTotalStr += ", " + element;
      } else {
        aceTotalStr += " or " + element;
      }
    });
    setAceTotal(aceTotalStr);
  }

  async function updateDealerTotal(check = checkAce) {
    console.log("start of updateDealerTotal: check = " + check);
    if ((dealerValues.includes(1) || dealerValues.includes(11)) && check) {
      await updateDealerTotalWithAce();
      return;
    }
    let newTotal = 0;
    for (const val of dealerValues) {
        newTotal += val;
    }
    console.log("end of updateDealerTotal: total = " + newTotal + " with vals " + dealerValues);
    const updatedTotal = newTotal;
    setDealerTotal(updatedTotal);
  }

  async function updateDealerTotalWithAce() {
    setCheckAce(false);
    let possibles = getAllPossible(dealerValues);
    const keysArray = Array.from(possibles.keys());
    if (keysArray.length == 0) {
      updateDealerTotal(false);
      return;
    }
    const highest = keysArray[keysArray.length - 1];
    const bestVals = possibles.get(highest);
    console.log("changing total to " + highest + " with vals " + bestVals);
    await replaceDealerValues(bestVals);
  }

  async function replaceDealerValues(newVals) {
    const updatedVals = [...newVals];
    setDealerValues(updatedVals);
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
    if (values.includes(1) || values.includes(11)) {
      updateAceTotal();
    }
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

  React.useEffect(() => {
    if (deck != "" && !(deck instanceof Promise)) {
      setUpGame();
    }
  }, [deck]);

  React.useEffect(() => {
    if (status == "Dealer's turn") {
        setAceTotal("");
        dealerTurn();
    }
  }, [status, dealerTotal]);

  React.useEffect(() => {
    if (won != ""){
        endGame();
    }
  }, [won]);

  function placeWager() {
    if (wager > wallet || wager < 1) {
        return;
    }
    updateWallet(-wager);
    setEarnings(wager);
    setReady(true);
    setStatus("Your turn");
  }

  async function startGame() {
    console.log("------------------------------");
    if (!ready) {
        return;
    }
    resetGame();
    setWon("");
    const date = new Date().toLocaleDateString();
    GameNotifier.broadcastEvent(userName, GameEvent.Start, {name: userName, earnings: wager, date: date, won: won});
    setFirstTurn(true);
    shuffleDeck();
  }

async function setUpGame() {
    dealCard();
    dealDealerCard();
    await delay(200);
    setTest("go");
}

async function shuffleDeck() {
  const response = await fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
  const data = await response.json();
  setDeck(data.deck_id);
}

async function drawCard() {
  if (deck == "") {
    return;
  }
  const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
  const data = await response.json();
  return data.cards[0];
}

 async function dealCard() {
    if (deck == "") {
      return;
    }
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
    let card = await drawCard();
    let val = card.value;
    if (val == "JACK" || val == "QUEEN" || val == "KING" || val == "0") {
      val = 10;
    } else if (val === "ACE") {
      val = 1;
    } else if (Number(val) < 11 && Number(val) > 1) {
      val = Number(val);
    } else {
      setCard(drawCard());
      val = card.value;
    }
    setCheckAce(true);
    updateValues(currentNumCards - 1, val);
    updatePlayerCards(currentNumCards - 1, card.image);
  }

 async function dealDealerCard() {
    let currentNumDealerCards = numDealerCards + 1;
    updateNumDealerCards();
    const space = document.getElementById("d" + (currentNumDealerCards).toString());
    if (space.classList.contains("empty")) {
        space.classList.replace("empty", "space");
    }
    space.classList.replace("space", "card")
    let card = await drawCard();
    let val = card.value;
    if (val == "JACK" || val == "QUEEN" || val == "KING" || val == "0") {
      val = 10;
    } else if (val === "ACE") {
      val = 1;
    } else if (Number(val) < 11 && Number(val) > 1) {
      val = Number(val);
    } else {
      setCard(drawCard());
      val = card.value;
    }
    setCheckAce(true);
    updateDealerValues(currentNumDealerCards - 1, val);
    updateDealerCards(currentNumDealerCards - 1, card.image);
    if (currentNumDealerCards == 1) {
      setDealerFirst(card.image);
    }
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
    setStatus("Dealer's turn");
    dealerCards[0] = <img src={dealerFirst} alt="Card" className="card-image"/>
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
    setEarnings(wager / 2);
    setWon("lost");
  }

  async function bust() {
    setReady(false);
    await delay(2500);
    setWon("lost");
  }

  async function blackjack() {
    setReady(false);
    await delay(2500);
    updateWallet(wager * 2.5)
    setEarnings(wager * 1.5)
    setWon("won");
  }

  async function dealerTurn() {
    console.log("start of turn: total = " + dealerTotal + " with cards " + dealerValues);
    if (status != "Dealer's turn") {
        return;
    }
    if (dealerTotal < 17) {
        await delay(1500);
        setTest(dealerTotal);
    }
    else if (dealerTotal == 21) {
        setStatus("Blackjack! You lose.");
        await delay(2500);
        setWon("lost");
    }
    else if (dealerTotal > 21) {
        setStatus("Bust! You win!");
        await delay(2500);
        updateWallet(wager * 2);
        setEarnings(wager);
        setWon("won");
    }
    else {
        if (total > dealerTotal) {
            setStatus("You win!");
            await delay(2500);
            updateWallet(wager * 2);
            setEarnings(wager);
            setWon("won");
        }
        else if (dealerTotal > total) {
            setStatus("You lose!");
            await delay(2500);
            setWon("lost");
        }
        else {
            setStatus("It's a tie!");
            await delay(2500);
            updateWallet(wager);
            setEarnings(0);
            setWon("won");
        }
    }
  }

  function endGame() {
    const input = document.getElementById("wager");
    input.disabled = false;
    setReady(false);
    const date = new Date().toLocaleDateString();
    GameNotifier.broadcastEvent(userName, GameEvent.End, {name: userName, earnings: earnings, date: date, won: won});
  }

  function resetGame() {
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
    setDealerCards([]);
    setPlayerCards([]);
    setTotal(0);
    setDealerTotal(0);
  }

  function beg() {
    updateWallet(100);
  }

  return (
    <main className="playMain">
            <section className="left">
                <section className="sub">
                    <p>Welcome, {userName}.</p>
                    <br />
                    <label htmlFor="wallet">Your Wallet:</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input type="text" id="wallet" value={wallet} readOnly />
                    </div>
                    {wallet == 0 && (status !== "Your turn" && status !== "Dealer's turn") && <button className="beg" onClick={beg}>Beg for money</button>}
                </section>
                <section className="sub">
                    <Players userName={props.userName} />
                </section>
                <section className="sub">
                    <div>
                            <div>
                                <label htmlFor="wager">Your Wager:</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">$</span>
                                    <input id="wager" type="number" min="1" max={wallet} defaultValue={wager} onChange={(e) => setWager(Number(e.target.value))} disabled={(status === "Your turn" || status === "Dealer's turn")}/>
                                </div>
                                <button onClick={placeWager} disabled={(status === "Your turn" || status === "Dealer's turn")}>Place</button>
                            </div>
                    </div>
                </section>
            </section>
            <br />
            <section className="right">
                <p className="deck"></p>
                <p className="empty" id="d1">{dealerCards[0]}</p>
                <p className="empty" id="d2">{dealerCards[1]}</p>
                <p className="empty" id="d3">{dealerCards[2]}</p>
                <p className="empty" id="d4">{dealerCards[3]}</p>
                <p className="empty" id="d5">{dealerCards[4]}</p>
                <p className="empty" id="d6">{dealerCards[5]}</p>
                <p className="empty" id="d7">{dealerCards[6]}</p>
                <p className="empty" id="d8">{dealerCards[7]}</p>
                <p className="empty" id="d9">{dealerCards[8]}</p>
                <p className="empty" id="d10">{dealerCards[9]}</p>
                <p className="empty" id="d11">{dealerCards[10]}</p>
                <label htmlFor="total">Dealer's Total:</label>
                <input type="text" id="total" value={status != "Your turn" ? dealerTotal : "--"} readOnly /> 
                <div>
                    {ready && <button onClick={hit}>Hit</button>}
                    {ready && <button onClick={stand}>Stand</button>}
                    {ready && firstTurn && <button onClick={doubleDown}>Double Down</button>}
                    {ready && firstTurn && <button onClick={surrender}>Surrender</button>}
                </div>
                <div className="statusDiv">
                    <p className="status">{status}</p>
                </div>
                <label htmlFor="total">Current Total:</label>
                <input type="text" id="total" value={(values.includes(1) || values.includes(11)) && ((aceTotal + "").includes("or")) && (total !== 21) ? aceTotal : total} readOnly />                    
                <br />
                <div className="space" id="1">{playerCards[0]}</div>
                <div className="space" id="2">{playerCards[1]}</div>
                <div className="space" id="3">{playerCards[2]}</div>
                <div className="space" id="4">{playerCards[3]}</div>
                <div className="empty" id="5">{playerCards[4]}</div>
                <div className="empty" id="6">{playerCards[5]}</div>
                <div className="empty" id="7">{playerCards[6]}</div>
                <div className="empty" id="8">{playerCards[7]}</div>
                <div className="empty" id="9">{playerCards[8]}</div>
                <div className="empty" id="10">{playerCards[9]}</div>
                <div className="empty" id="11">{playerCards[10]}</div>
            </section>   
        </main>

  );
}
