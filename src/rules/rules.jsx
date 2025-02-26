import React from 'react';
import './rules.css';


export function Rules() {
    const [header1, setHeader1] = React.useState('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');
    const [header2, setHeader2] = React.useState('Loading...');
    const [header3, setHeader3] = React.useState('unknown');
  
    React.useEffect(() => {
      setHeader1(`How to Play`);
      setHeader2('Card Values');
      setHeader3('Dealer Rules');
    }, []);

  return (
    <main className="otherMain">
            <section className="section">
                <p className="intro-text">
                    Blackjack is a classic casino game in which the player opposes the dealer rather than other players. 
                    The goal is to get a hand whose total is as close as possible to 21 without surpassing it. A hand equal to exactly 21 is called a Blackjack.
                </p>
            </section>

            <section className="section">
                <h1>{header1}</h1>
                <p>
                    Before receiving your hand, you must place a wager, which draws money out of your wallet. 
                    If you win, you will receive your twice your wager. If you lose, you get nothing back, and your wager is lost. 
                    In the case of a draw, you will receive your wager back, such that you do not gain or lose anything.
                </p>
                <br />
                <p>
                    After placing your wager, you will receive two cards. The dealer also receives two, only one of which is visible. 
                    Each turn, you will choose from the options below. If your total goes over 21, you automatically bust, and the dealer wins. 
                    If your total hits 21 exactly, you automatically win and, on top of the standard winnings, you receive a bonus equal to half your original wager. 
                    If you choose to stand, your total is final and the dealer will take their turn.
                </p>
            </section>

            <section className="section">
                <h2>Basic Moves</h2>
                <ul>
                    <li><b><u>Hit</u></b>: Receive another card.</li>
                    <li><b><u>Stand</u></b>: End your turn with the current total.</li>
                </ul>
                <h2>Special Moves</h2>
                <ul>
                    <li><b><u>Double Down</u></b>: Before any cards after the first two are dealt, you may double your wager. Potential loss and gain will be twice the initial bet.</li>
                    <li><b><u>Surrender</u></b>: Before any cards after the first two are dealt, you may give up and receive half your wager back.</li>
                    <li><b><u>Split</u></b>: If your first two cards have the same value, you may choose to split your hand. A second wager equal in value 
                        to the first will be placed on the second hand. You may then play each hand individually as you would any other.
                    </li>
                </ul>
                <p>
                    <i><u>Note</u>: If a pair of aces are split, only one additional card may be placed on each hand. 
                    In the case of a Blackjack on split aces, the bonus will not be received. The player will only receive the standard winnings.</i>
                </p>
            </section>

            <section className="section">
                <h1>{header2}</h1>
                <p>
                    Any numbered card (2-10) has a value equal to its number. Any face card has a value of 10. 
                    An ace can have a value of either 1 or 11. Upon standing, the ace will be treated as whichever value 
                    better suits the hand.
                </p>
            </section>

            <section className="section">
                <h1>{header3}</h1>
                <p>
                    The dealer must play by a specific set of rules. They can make no special moves (double down, surrender, or split). 
                    When their turn starts, they reveal their hidden card. If the total is 16 or less, they must hit until it is 17 or more. 
                    If it is already 17 or more, they must stand immediately. If the dealer busts, you automatically win. If the dealer gets Blackjack, you automatically lose. 
                    Otherwise, if the dealer stands with a total of 17-20, the winner is whoever has the hand closer to 21. In the case of a tie, you receive your initial wager back.
                </p>
            </section>
        </main>
  );
}