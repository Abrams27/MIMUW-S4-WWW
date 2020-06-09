// "use strict";
import { expect } from "chai";
import "mocha";
import {Meme, MemesStorage, PriceHistory} from "../public/meme";

describe("Meme tests", () => {

  it('latest price', () => {
    const latestPrice = 1;

    const meme = new Meme("name", "url", latestPrice);

    expect(meme.getLatestPrice()).to.equal(latestPrice);
  });

  it('latest price update', () => {
    const price = 1;
    const latestPrice = 2;

    const meme = new Meme("name", "url", price);

    meme.addLatestPrice(latestPrice);

    expect(meme.getLatestPrice()).to.equal(latestPrice);
  });

  it('price history', () => {
    const price = 1;
    const latestPrice = 2;

    const meme = new Meme("name", "url", price);

    meme.addLatestPrice(latestPrice);

    const priceHistory: number[] = meme.getPriceHistory();

    expect(priceHistory.length).to.equal(2);
    expect(priceHistory[0]).to.equal(latestPrice);
    expect(priceHistory[1]).to.equal(price);
  });

});

describe("PriceHistory test", () => {

  it('price history', () => {
    const price1 = 1;
    const price2 = 2;

    const priceHistory = new PriceHistory();

    priceHistory.addLatestPrice(price1);
    priceHistory.addLatestPrice(price2);

    expect(priceHistory.getLatestPrice()).to.equal(price2);
  });

});

describe("MemeStorage test", () => {

  it('get meme with id', () => {
    const meme1 = new Meme("test1", "test1", 1);
    const meme2 = new Meme("test2", "test2", 2);
    const meme3 = new Meme("test3", "test3", 3);

    const memeStorage = new MemesStorage();

    memeStorage.addMeme(meme1);
    memeStorage.addMeme(meme2);
    memeStorage.addMeme(meme3);

    expect(memeStorage.getMemeWithId(meme1.getId()).compareWithId(meme1.getId())).to.equal(true);
  });

  it('get top 3 most expensive memes', () => {
    const meme1 = new Meme("test1", "test1", 1);
    const meme2 = new Meme("test2", "test2", 2);
    const meme3 = new Meme("test3", "test3", 3);

    const memeStorage = new MemesStorage();

    memeStorage.addMeme(meme1);
    memeStorage.addMeme(meme2);
    memeStorage.addMeme(meme3);

    let mostExpensiveMemes = memeStorage.getTheMostExpensiveTop3();

    expect(mostExpensiveMemes.length).to.equal(3);
    expect(mostExpensiveMemes[0].getLatestPrice()).to.equal(3);
    expect(mostExpensiveMemes[1].getLatestPrice()).to.equal(2);
    expect(mostExpensiveMemes[2].getLatestPrice()).to.equal(1);
  });
});
