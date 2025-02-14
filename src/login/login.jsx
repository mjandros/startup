import React from 'react';
import './login.css';

export function Login() {
  return (
    <main className="otherMain">
            <div>
                <h1 className="title">Blackjack</h1>
                <form method="get" action="play">
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