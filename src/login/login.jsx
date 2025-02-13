import React from 'react';

export function Login() {
  return (
    <main>
            <div>
                <h1>Blackjack</h1>
                <form method="get" action="play.html">
                    <div>
                    <input type="text" placeholder="Email" />
                    </div>
                    <div>
                    <input type="password" placeholder="Password" />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
        </main>
  );
}