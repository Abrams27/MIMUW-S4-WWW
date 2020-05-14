import {fibonacci} from "./fibonacci.js";

'use strict';

let opoznienie = <HTMLElement>document.getElementById('opoznione');

let wejsiceStart = <HTMLInputElement>document.getElementById("start");
let wejscieKoniec = <HTMLInputElement>document.getElementById("destination");
let wejscieImie = <HTMLInputElement>document.getElementById("name");
let wejscieNazwisko = <HTMLInputElement>document.getElementById("surname");
let wejscieData = <HTMLInputElement>document.getElementById("date");

let potwierdzenieRejestracji =  <HTMLElement>document.getElementById('rezerwacja-popup');

let form = <HTMLElement>document.getElementById('rezerwacja-form');
let przycisk = <HTMLElement>document.getElementById("guzik-wyslij");

opoznienie.addEventListener('click', pokoloruj);

form.addEventListener('input', rozwiklajWejscie);
form.addEventListener('submit', rozwiklajPotwierdzenie);
form.addEventListener('reset', rozwiklajReset);

ukryjPrzyciskJesliBrakujePol();

function rozwiklajReset(): void {
  wejscieData.value="";
  ukryjPrzyciskJesliBrakujePol();
}

function rozwiklajWejscie(): void {
  ukryjPrzyciskJesliBrakujePol();
}

function ukryjPrzyciskJesliBrakujePol() {
  if (czyWszystkiePolaSaWypelnionePoprawnie()) {
    przycisk.removeAttribute("disabled");
  } else {
    przycisk.setAttribute("disabled", "true");
  }
}

function czyWszystkiePolaSaWypelnionePoprawnie(): boolean {
  return czyPoleZwyboremJestPoprawne(wejsiceStart)
    && czyPoleZwyboremJestPoprawne(wejscieKoniec)
    && czyPoleTeskstoweJestNiepuste(wejscieImie)
    && czyPoleTeskstoweJestNiepuste(wejscieNazwisko)
    && czyPoleZDataJestPoprawne(wejscieData);
}

function czyPoleTeskstoweJestNiepuste(pole: HTMLInputElement): boolean {
  return pole.value.trim().length > 0
}

function czyPoleZwyboremJestPoprawne(pole: HTMLInputElement): boolean {
  return pole.value != "empty"
}

function czyPoleZDataJestPoprawne(pole: HTMLInputElement): boolean {
  let wpisanaData = new Date(Date.parse(pole.value));
  let dzisiejszaData = new Date (Date.now() - 86400000);

  return wpisanaData >= dzisiejszaData
}

function rozwiklajPotwierdzenie(event: any): void {
  potwierdzenieRejestracji.textContent = `
    Skąd: ${wejsiceStart.value}
    Dokąd: ${wejscieKoniec.value}
    Imie: ${wejscieImie.value}
    Nazwisko: ${wejscieNazwisko.value}
    Data: ${wejscieData.value}`;

  potwierdzenieRejestracji.style.visibility = "visible";

  event.preventDefault();
}


let licznikKlikniec = 0;
function pokoloruj(mouseEvent: MouseEvent) {
  licznikKlikniec++;
  console.log(fibonacci(10 * licznikKlikniec));
  let cel = mouseEvent.target;
  // @ts-ignore
  let element = this as HTMLElement;


  let aktualnyKolor = window
  .getComputedStyle(element)
  .getPropertyValue('background-color');

  // @ts-ignore
  let [_,...koloryJakoTekst] =
      /rgb[a]?\((\d+),[^0-9]*(\d+),[^0-9]*(\d+)[,]?[^0-9]*(\d*)\)/
      .exec(aktualnyKolor);

  let colors: number[] = [];
  for(let i = 0; i < 3; i++) {
    colors[i] = (parseInt(koloryJakoTekst[i]) + 0x20) % 256;
  }

  element.style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
}
