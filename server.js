const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const login = require('./controllers/login');
const profile = require('./controllers/profile');
const admin = require('./controllers/admin');
const user = require('./controllers/user');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'ammijaan',
    database : 'maha'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/login', (req, res)=> { login.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.post('/admin', (req, res) => { admin.handleAdminData(req, res, db) })
app.post('/user', (req, res) => { user.handleUser(req, res, db) })

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
