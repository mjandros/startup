import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
      
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <div>
        <div>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
        </div>
        <div>
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>
        <Button variant='primary' onClick={() => loginOrCreate(`/api/auth/login`)} disabled={!userName || !password}>
          Login
        </Button>
        <Button variant='secondary' onClick={() => loginOrCreate(`/api/auth/create`)} disabled={!userName || !password}>
          Create
        </Button>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
