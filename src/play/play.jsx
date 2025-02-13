import React from 'react';

export function Play() {
  return (
    <main>
            <section>
                <section>
                    <p>Welcome, example-player.</p>
                    <div>
                        <label for="wallet">Your Wallet: $</label>
                        <input type="text" id="wallet" value="1000" readonly />
                    </div>
                    <ul className="notification">
                        <li className="player-name">Don just earned $700!</li>
                        <li className="player-name">Michael just lost $2500.</li>
                        <li className="player-name">Nicolas is now in debt.</li>
                    </ul>
                </section>
                <section>
                    <div>
                        <form>
                            <div>
                                <label for="wager">Your Wager:</label>
                                <input id="wager" type="number" min="1" />
                                <button type="submit">Place</button>
                            </div>
                        </form>               
                    </div>
                </section>
            </section>
            <br />
            <section>
                <div>
                    <canvas id="deck" width="150" height="225" style="border: 3px solid #000000"></canvas>
                    <canvas id="card1" width="150" height="225" style="border: 1px solid #000000"></canvas>
                    <canvas id="card2" width="150" height="225" style="border: 1px solid #000000"></canvas>
                </div>
                <br />
                <div>
                    <button>Hit</button>
                    <button>Stand</button>
                    <button>Double Down</button>
                    <button>Surrender</button>
                </div>
                <br />
                    <label for="total">Current Total:</label>
                    <input type="text" id="total" value="17" readonly />                    
                <br />
                <div>
                    <canvas id="space" width="150" height="225" style="border: 1px solid #FFFFFF"></canvas>
                    <canvas id="card3" width="150" height="225" style="border: 1px solid #000000"></canvas>
                    <canvas id="card4" width="150" height="225" style="border: 1px solid #000000"></canvas>
                </div>
            </section>
            <script>
                var ctx = document.getElementById("deck").getContext("2d");
                ctx.font = "30px Arial";
                ctx.fillText("Deck", 10, 50);
                ctx = document.getElementById("card1").getContext("2d");
                ctx.font = "30px Arial";
                ctx.fillText("Card", 10, 50);
                ctx = document.getElementById("card2").getContext("2d");
                ctx.font = "30px Arial";
                ctx.fillText("2", 10, 50);
                ctx = document.getElementById("card3").getContext("2d");
                ctx.font = "30px Arial";
                ctx.fillText("K", 10, 50);
                ctx = document.getElementById("card4").getContext("2d");
                ctx.font = "30px Arial";
                ctx.fillText("7", 10, 50);
            </script>
        </main>
  );
}