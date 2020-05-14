import { expect } from "chai";
import "mocha";
import { driver } from 'mocha-webdriver';

const guzikZatwierdz = "input[type=submit]";
const sciezka = `file://${process.cwd()}/listaLotow.html`;
const imie = "Marcin";
const nazwisko = "Abramowicz";
const start = "warszawa";
const koniec = "lodz";
const pustySelect = "empty";
const przeszlaData = "2000-01-01";
const przyszlaData = "2222-01-01";

describe('Form', function () {
  it("should block button if name is empty", async function() {
    this.timeout(4000);

    await driver.get(sciezka);
    await wypelnijPola("", nazwisko, start, koniec, przeszlaData);

    expect(await driver.find(guzikZatwierdz).isEnabled()).to.equal(false);
  });

  it("should block button if surname is empty", async function() {
    this.timeout(4000);

    await driver.get(sciezka);
    await wypelnijPola(imie, "", start, koniec, przyszlaData);
    expect(await driver.find(guzikZatwierdz).isEnabled()).to.equal(false);
  });

  it("should block button if from is empty", async function() {
    this.timeout(4000);

    await driver.get(sciezka);
    await wypelnijPola(imie, nazwisko, pustySelect, koniec, przyszlaData);
    expect(await driver.find(guzikZatwierdz).isEnabled()).to.equal(false);
  });

  it("should block button if destination is empty", async function() {
    this.timeout(4000);

    await driver.get(sciezka);
    await wypelnijPola(imie, nazwisko, start, pustySelect, przyszlaData);
    expect(await driver.find(guzikZatwierdz).isEnabled()).to.equal(false);
  });

  it("should block button if date is invalid", async function() {
    this.timeout(4000);

    await driver.get(sciezka);
    await wypelnijPola(imie, nazwisko, start, koniec, przeszlaData);
    expect(await driver.find(guzikZatwierdz).isEnabled()).to.equal(false);
  });

  it("should block button if date is invalid", async function() {
    this.timeout(4000);

    await driver.get(sciezka);
    await wypelnijPola(imie, nazwisko, start, koniec, przyszlaData);
    expect(await driver.find(guzikZatwierdz).isEnabled()).to.equal(true);
  });
});

async function wypelnijPola(imie: string, nazwisko: string, start: string, end: string, data: string) {
  await wypelnijPole("input", "name", imie);
  await wypelnijPole("input", "surname", nazwisko);
  await wypelnijPole("select", "start", start);
  await wypelnijPole("select", "destination", end);
  await wypelnijPole("input", "date", data);
}

async function wypelnijPole(typPola: string, nazwaPola: string, wartosc: string) {
  const wejscie = await driver.find(`${typPola}[name=${nazwaPola}]`);
  if (typPola == "input") {
    await wejscie.clear();
  }
  await wejscie.sendKeys(wartosc);
}
