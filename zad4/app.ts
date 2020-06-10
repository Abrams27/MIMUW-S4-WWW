import {Meme} from "./public/meme";

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var csurf = require('csurf');
var sqlite3 = require('sqlite3').verbose();
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR, password VARCHAR)");
  db.run("INSERT INTO users (username, password) VALUES ('admin', 'admin')");
  db.run("INSERT INTO users (username, password) VALUES ('user', 'user')");

  db.run("CREATE TABLE memes (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, url VARCHAR, latest_price INTEGER)");
  db.run("INSERT INTO memes (name, url, latest_price) VALUES ('Gold', 'https://i.redd.it/h7rplf9jt8y21.png', 1000)");
  db.run("INSERT INTO memes (name, url, latest_price) VALUES ('Platinum', 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg', 1100)");
  db.run("INSERT INTO memes (name, url, latest_price) VALUES ('Elite', 'https://i.imgflip.com/30zz5g.jpg', 1200)");

  db.run("CREATE TABLE prices (id INTEGER PRIMARY KEY AUTOINCREMENT, meme_id INTEGER, value INTEGER)");
  db.run("INSERT INTO prices (meme_id, value) VALUES (1, 1200)");
  db.run("INSERT INTO prices (meme_id, value) VALUES (2, 1200)");
  db.run("INSERT INTO prices (meme_id, value) VALUES (3, 1200)");
});


app.set('../views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var csrfProtection = csurf({ cookie: true });

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'sAn7baRbhx4'
}));


app.get('/', csrfProtection, function(req, res, next) {
  res.render('login', {
    title: "Zaloguj sie",
    user: req.session.login,
    csrfToken: req.csrfToken()
  });
});

app.post('/', csrfProtection, function(req, res, next) {
  req.db.get("SELECT * FROM users WHERE username = '" + req.body.login + "' AND password ='" + req.body.password + "'",
      function(err, row) {
        if (row != undefined) {
          req.session.login = req.body.login;
          req.session.user_id = row.id;
          res.redirect('/memes');
        }
      })
});


app.get('/logout', function(req, res, next) {
  delete(req.session.login);
  delete(req.session.user_id);
  res.redirect('/');
});


app.get('/memes', csrfProtection, function(req, res) {
  req.db.all("SELECT * FROM memes ORDER BY latest_price DESC LIMIT 3",
      function(err, memes) {
        let mostExpensive = memes.map((meme) => new Meme(meme.id, meme.name, meme.url, [], meme.price));

        res.render('index', { title: 'Meme market', message: 'Hello there!', memes: mostExpensive, csrfToken: req.csrfToken() })
      })
});

app.get('/meme/:memeId', csrfProtection, function (req, res) {
  req.db.get("SELECT * FROM memes WHERE id = '" + req.params.memeId + "'",
      function(err, row) {
        req.db.all("SELECT * FROM prices WHERE meme_id =" + req.params.memeId + " ORDER BY id",
            function(err, prices) {
              let mappedPrices = prices.map(price => price.value);

              if (row != undefined) {
                let meme = new Meme(row.id, row.name, row.url, mappedPrices);
                res.render('meme', { meme: meme, csrfToken: req.csrfToken() })
              }
            })
      })
});

app.post('/meme/:memeId', csrfProtection, function (req, res) {
  req.db.get("SELECT * FROM users WHERE id =" + req.session.user_id + "",
      function(err, user) {
        if(user != undefined) {
          req.db.run("UPDATE memes SET latest_price =" + req.body.price + " WHERE id =" + req.params.memeId,
              () =>
                  req.db.run("INSERT INTO prices (meme_id, value) VALUES (" + req.params.memeId + "," + req.body.price + ")",
                      () => res.redirect('/memes')
                  )
          )
        }
      });
});

app.use(function(req, res, next) {
  res.render('error')
});

app.use(function(err, req, res, next) {
  res.render('error')
});

module.exports = app;
