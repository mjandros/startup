const port = process.argv.length > 2 ? process.argv[2] : 4000;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

app.use(express.static('public'));
app.use(express.json());

let users = [];
let wallets = [];

let apiRouter = express.Router();
app.use(`/api`, apiRouter);