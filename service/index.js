import { getUser, getUserByToken, addUser, updateWallet, addWallet, getHighScores } from './database.js';
import { user, wallet } from './models.js';

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

let users = [];
let wallets = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    if (req.method === "POST") {
        console.log(`Amount: ${req.body.wallet}`);
    }
    next();
  });


let apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await createUser(req.body.email, req.body.password);
  
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
    }
  });
  
  // GetAuth login an existing user
  apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        res.send({ email: user.email });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });
  
  // DeleteAuth logout a user
  apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
  });
  
  // Middleware to verify that the user is authorized to call an endpoint
  const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies?.[authCookieName]);
    
    console.log("User Found (verifyAuth):", user); // Check if the user is found

    if (user) {
        next();
    } else {
        console.log("Unauthorized request!"); // See if this is triggering
        res.status(401).send({ msg: 'Unauthorized' });
    }
  };
  
  apiRouter.use(verifyAuth);

// Get all wallets (e.g., for leaderboard)
apiRouter.get('/wallets', verifyAuth, async (_req, res) => {
  const highScores = await getHighScores();
  res.send(highScores);
});

// Get the authenticated user's wallet
apiRouter.get('/wallet', verifyAuth, async (req, res) => {
    try {
      const user = await findUser('token', req.cookies[authCookieName]);
      if (user) {
        res.json({ wallet: user.wallet });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Update the authenticated user's wallet
apiRouter.post('/wallet', verifyAuth, async (req, res) => {
  try {
    const user = await findUser('token', req.cookies[authCookieName]);
    await updateWallet({ email: user.email, score: req.body.wallet });
    res.send({ wallet: getUser(user.email).wallet });
  } catch (error) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
    
})
  
  // Default error handler
  app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });
  
  // Return the application's default page if the path is unknown
  app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

// function updateWallets(newWallet) {
//     let found = false;
//     for (const [i, prevWallet] of wallets.entries()) {
//       if (newWallet.wallet > prevWallet.wallet) {
//         wallets.splice(i, 0, newWallet);
//         found = true;
//         break;
//       }
//     }
  
//     if (!found) {
//       wallets.push(newWallet);
//     }
  
//     if (wallets.length > 10) {
//       wallets.length = 10;
//     }
  
//     return wallets;
//   }
  
  async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
      wallet: 1000,
    };
    addUser(user);
    //users.push(user);
  
    return user;
  }
  
  async function findUser(field, value) {
    if (!value) return null;
    if (field == 'token') {
      return await getUserByToken(value);
    }
    return await getUser(value);
  }
  
  // setAuthCookie in the HTTP response
  function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });