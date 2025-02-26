import React from 'react';
import './play.css';
import { BlackjackGame } from './game';


export function Play(props) {
  return (
    <main className="playMain">
            <section className="left">
                <section className="sub">
                    <p>Welcome, example-player.</p>
                    <br />
                    <label for="wallet">Your Wallet:</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input type="text" id="wallet" value="1000" readonly />
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
                        <form>
                            <div>
                                <label for="wager">Your Wager:</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">$</span>
                                    <input id="wager" type="number" min="1" />
                                </div>
                                <button type="submit">Place</button>
                            </div>
                        </form>               
                    </div>
                </section>
            </section>
            <br />   
            <BlackjackGame userName={props.userName} />
        </main>
  );
}