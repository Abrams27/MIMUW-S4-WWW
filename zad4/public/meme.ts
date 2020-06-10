export class MemesStorage {

  private memes: Meme[];

  constructor() {
    this.memes = [];
  }

  public addMeme(meme: Meme) {
    this.memes.push(meme);
  }

  public getMemeWithId(memeId: number): Meme {
    return this.memes
      .find(meme => meme.compareWithId(memeId));
  }

  public addLatestPriceForMemeWithId(memeId: number, latestPrice: number) {
    let meme = this.memes
    .find(meme => meme.compareWithId(memeId));

    if (meme != undefined) {
      meme.addLatestPrice(latestPrice);
    }
  }

  public getTheMostExpensiveTop3(): Meme[] {
    return this.memes
    .sort((meme1, meme2) => meme2.comparePrices(meme1))
    .slice(0, 3);
  }

}

export class Meme {

  private name: string;
  private url: string;
  private priceHistory: PriceHistory;
  private readonly id: number;

  public constructor(id: number, name: string, url: string, priceHistory: number[], price?: number) {
    this.name = name;
    this.url = url;
    this.priceHistory = new PriceHistory();
    this.id = id;

    for (let previousPrice of priceHistory) {
      this.priceHistory.addLatestPrice(previousPrice);
    }

    if (price != undefined) {
      this.priceHistory.addLatestPrice(price);
    }
  }

  public addLatestPrice(latestPrice: number) {
    this.priceHistory
    .addLatestPrice(latestPrice);
  }

  public getLatestPrice(): number {
    return this.priceHistory
      .getLatestPrice();
  }

  public comparePrices(meme: Meme): number {
    return this.getLatestPrice() - meme.getLatestPrice();
  }

  public compareWithId(memeId: number): boolean {
    return this.id === memeId;
  }

  public getPriceHistory(): number[] {
    return this.priceHistory
      .getAllPrices();
  }

  public getId(): number {
    return this.id;
  }
}

export class PriceHistory {

  private prices: number[];

  constructor() {
    this.prices = [];
  }

  public addLatestPrice(latestPrice: number) {
    this.prices.reverse();
    this.prices.push(latestPrice);
    this.prices.reverse();
  }

  public getLatestPrice(): number {
    return this.prices[0];
  }

  public getAllPrices(): number[] {
    return this.prices;
  }

}

class IdGenerator {

  private static currentId: number = 0;

  public static generateId(): number {
    IdGenerator.currentId++;

    return IdGenerator.currentId;
  }
}
