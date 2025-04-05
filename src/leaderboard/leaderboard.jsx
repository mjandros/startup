import React from 'react';
import './leaderboard.css';

export function Leaderboard() {
    const [wallets, setWallets] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/wallets', {method: 'get'})
      .then((response) => response.json())
      .then((scores) => {
        setWallets(scores);
      });
  }, []);

  const scoreRows = [];
  if (wallets.length) {
    for (const [i, score] of wallets.entries()) {
      console.log("Score: \n" + score);
      scoreRows.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{score.email}</td>
          <td>{score.wallet}</td>
          <td>{score.date}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to score</td>
      </tr>
    );
  }
  return (
    <main className="otherMain">
            <table>
                <thead className='table-dark'>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Wallet</th>
                        <th>Last Played</th>
                    </tr>
                </thead>
                <tbody id='wallets'>{scoreRows}</tbody>
            </table>
        </main>
  );
}