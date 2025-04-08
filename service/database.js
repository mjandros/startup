const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('blackjack');
const userCollection = db.collection('user');
const walletCollection = db.collection('wallet');

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
  
  async function addWallet(wallet) {
    return walletCollection.insertOne(wallet);
  }
  
  function getHighScores() {
    const query = { 
      wallet: { $gt: 0 },
      date: { $ne: null }
    };
      const options = {
      sort: { wallet: -1 },
      limit: 5,
      //projection: { email: 1, wallet: 1, date: 1},
    };
    const cursor = userCollection.find(query, options);
    return results = cursor.toArray();
  }

  module.exports = {
    getUser,
    getUserByToken,
    updateToken,
    addUser,
    updateWallet,
    getHighScores
  };

 // export { getUser, getUserByToken, updateToken, addUser, updateWallet, getHighScores };