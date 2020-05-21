var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

class MemesStorage {

  constructor() {
    this.memes = [];
  }

  addMeme(meme) {
    this.memes.push(meme);
  }

  getMemeWithId(memeId) {
    return this.memes
      .find(meme => meme.compareWithId(memeId));
  }

  addLatestPriceForMemeWithId(memeId, latestPrice) {
    this.memes
    .find(meme => meme.doesHaveGivenId(memeId))
    .addLatestPrice(latestPrice);
  }

  getTheMostExpensiveTop3() {
    return this.memes
    .sort((meme1, meme2) => meme2.comparePrices(meme1))
    .slice(0, 3);
  }

}
class Meme {

  constructor(name, url, price) {
    this.name = name;
    this.url = url;
    this.priceHistory = new PriceHistory();

    this.priceHistory.addLatestPrice(price);
    this.id = IdGenerator.generateId();
  }

  addLatestPrice(latestPrice) {
    this.priceHistory
    .addLatestPrice(latestPrice);
  }

  getLatestPrice() {
    return this.priceHistory
      .getLatestPrice();
  }

  doesHaveGivenId(id) {
    return this.id == id;
  }

  comparePrices(meme) {
    return this.getLatestPrice() - meme.getLatestPrice();
  }

  compareWithId(memeId) {
    return this.id == memeId;
  }

  getPriceHistory() {
    return this.priceHistory
      .getAllPrices();
  }

  getId() {
    return this.id;
  }
}
class PriceHistory {

  constructor() {
    this.prices = [];
  }

  addLatestPrice(latestPrice) {
    this.prices.reverse();
    this.prices.push(latestPrice);
    this.prices.reverse();
  }

  getLatestPrice() {
    return this.prices[this.prices.length - 1];
  }

  getAllPrices() {
    return this.prices;
  }

}

let IdGenerator = /** @class */ (() => {
  class IdGenerator {
    static generateId() {
      IdGenerator.currentId++;
      return IdGenerator.currentId;
    }
  }
  IdGenerator.currentId = 0;
  return IdGenerator;
})();

let memeStorage = new MemesStorage();
memeStorage.addMeme(new Meme('Gold', 'https://i.redd.it/h7rplf9jt8y21.png', 1000));
memeStorage.addMeme(new Meme('Platinum', 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg', 1100));
memeStorage.addMeme(new Meme('Elite', 'https://i.imgflip.com/30zz5g.jpg', 1200));

let mostExpensive = memeStorage.getTheMostExpensiveTop3();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
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

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
