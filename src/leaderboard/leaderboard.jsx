import React from 'react';
import './leaderboard.css';

export function Leaderboard() {
  return (
    <main className="otherMain">
            <table>
                <thead>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Wallet ($)</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Don Cheadle</td>
                        <td>45000</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Michael Cera</td>
                        <td>42000</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Nicolas Cage</td>
                        <td>38000</td>
                    </tr>
                </tbody>
            </table>
        </main>
  );
}