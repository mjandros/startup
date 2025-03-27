import { MongoClient } from 'mongodb';
import config from './dbConfig.json' with { type: 'json' };
import { user, wallet } from './models.js';

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('blackjack');
const userCollection = client.connection('user');
const walletCollection = client.connection('wallet');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
    return userCollection.findOne({ email: email });
  }
  
  function getUserByToken(token) {
    return userCollection.findOne({ token: token });
  }

  async function updateToken(user) {
    await userCollection.updateOne({email: user.email}, {$set: user});
  }
  
  async function addUser(user) {
    await userCollection.insertOne(user);
  }
  
  async function updateWallet(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
  }
  
  async function addWallet(score) {
    return walletCollection.insertOne(score);
  }
  
  function getHighScores() {
    const query = { wallet: { $gt: 0} };
    const options = {
      sort: { score: -1 },
      limit: 10,
    };
    const cursor = walletCollection.find(query, options);
    return cursor.toArray();
  }