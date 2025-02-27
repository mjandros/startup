import React from 'react';
import './leaderboard.css';

export function Leaderboard() {
    const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    const scoresText = localStorage.getItem('wallets');
    if (scoresText) {
      setScores(JSON.parse(scoresText));
    }
  }, []);

  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{score.name.split('@')[0]}</td>
          <td>{score.score}</td>
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
                <tbody id='scores'>{scoreRows}</tbody>
            </table>
        </main>
  );
}