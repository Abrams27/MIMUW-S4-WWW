import {Meme, MemesStorage} from "./public/meme";

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

let memeStorage: MemesStorage = new MemesStorage();
memeStorage.addMeme(new Meme('Gold', 'https://i.redd.it/h7rplf9jt8y21.png', 1000));
memeStorage.addMeme(new Meme('Platinum', 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg', 1100));
memeStorage.addMeme(new Meme('Elite', 'https://i.imgflip.com/30zz5g.jpg', 1200));

let mostExpensive = memeStorage.getTheMostExpensiveTop3();

// view engine setup
app.set('../views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index', { title: 'Meme market', message: 'Hello there!', memes: mostExpensive })
});

app.get('/meme/:memeId', function (req, res) {
  let meme = memeStorage.getMemeWithId(req.params.memeId);
  res.render('meme', { meme: meme })
});

app.use(express.urlencoded({
  extended: true
}));

app.post('/meme/:memeId', function (req, res) {
  memeStorage.addLatestPriceForMemeWithId(req.params.memeId, req.body.price);

  let meme = memeStorage.getMemeWithId(req.params.memeId);
  res.render('meme', { meme: meme })
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  res.render('error')
});

app.use(function(err, req, res, next) {
  res.render('error')
});

module.exports = app;
