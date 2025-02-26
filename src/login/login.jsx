import React from 'react';
import './login.css';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({userName, authState, onAuthChange}) {
  return (
    <main className="otherMain">
            <div>
                {authState !== AuthState.Unknown && <h1>Blackjack</h1>}
                        {authState === AuthState.Authenticated && (
                          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
                        )}
                        {authState === AuthState.Unauthenticated && (
                          <Unauthenticated
                            userName={userName}
                            onLogin={(loginUserName) => {
                              onAuthChange(loginUserName, AuthState.Authenticated);
                            }}
                          />
                        )}
            </div>
        </main>
  );
}