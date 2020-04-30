'use strict';

let opoznienie = document.getElementById('opoznione');
opoznienie.addEventListener('click', pokoloruj);


const wymaganaLiczbaPol = 5;
let wartosciPol = new Map();
let rodzajWejsciaDlaNazwyPola = new Map();

let potwierdzenieRejestracji = document.getElementById('rezerwacja-popup');
const form = document.getElementById('rezerwacja-form');
form.addEventListener('input', rozwiklajWejscie);
form.addEventListener('submit', rozwiklajPotwierdzenie);
form.addEventListener('reset', rozwiklajReset);

let przycisk = document.getElementById("guzik-wyslij");

ustawRodzajeWejsciaDlaNazwPol();

function ustawRodzajeWejsciaDlaNazwPol() {
  rodzajWejsciaDlaNazwyPola.set("start", "select");
  rodzajWejsciaDlaNazwyPola.set("destination", "select");
  rodzajWejsciaDlaNazwyPola.set("name", "text");
  rodzajWejsciaDlaNazwyPola.set("surname", "text");
  rodzajWejsciaDlaNazwyPola.set("date", "date");
}

function rozwiklajPotwierdzenie(event): void {
  potwierdzenieRejestracji.textContent = `
    Skąd: ${wartosciPol.get("start")}
    Dokąd: ${wartosciPol.get("destination")}
    Imie: ${wartosciPol.get("name")}
    Nazwisko: ${wartosciPol.get("surname")}
    Data: ${wartosciPol.get("date")}`;

  potwierdzenieRejestracji.style.visibility = "visible";

  console.log(wartosciPol);
  event.preventDefault();
}

function rozwiklajReset(event): void {
  wartosciPol.clear();
  ukryjPrzyciskJesliBrakujePol();
}

function rozwiklajWejscie(event): void {
  let nazwaCelu = event.target.name;
  let wartoscCelu = event.target.value;
  let rodzajWejsciaCelu = rodzajWejsciaDlaNazwyPola.get(nazwaCelu);

  switch (rodzajWejsciaCelu) {
    case "text":
      rozwiklajWejscieZPolemTesktowym(nazwaCelu, wartoscCelu);
      break;
    case "date":
      rozwiklajWejscieZData(nazwaCelu, wartoscCelu);
      break;
    case "select":
      rozwiklajWejscieZPolemDoWyboru(nazwaCelu, wartoscCelu);
      break;
    default:
      console.log("Cos nie tak : (");
      break;
  }

  ukryjPrzyciskJesliBrakujePol();
}

function rozwiklajWejscieZPolemTesktowym(nazwa: string, wartosc: string): void {
  if (wartosc.trim().length > 0) {
    wartosciPol.set(nazwa, wartosc);
  } else {
    wartosciPol.delete(nazwa);
  }
}

function rozwiklajWejscieZPolemDoWyboru(nazwa: string, wartosc: string): void {
  if (wartosc != "empty") {
    wartosciPol.set(nazwa, wartosc);
  } else {
    wartosciPol.delete(nazwa);
  }
}

function rozwiklajWejscieZData(nazwa: string, wartosc: string): void {
  let wpisanaData = new Date(Date.parse(wartosc));
  let dzisiejszaData = new Date (Date.now());

  if (wpisanaData >= dzisiejszaData) {
    wartosciPol.set(nazwa, wartosc);
  } else {
    wartosciPol.delete(nazwa);
  }
}


function ukryjPrzyciskJesliBrakujePol() {
  if (wartosciPol.size == wymaganaLiczbaPol) {
    przycisk.removeAttribute("disabled");
  } else {
    przycisk.setAttribute("disabled", "true");
  }
}

let licznikKlikniec = 0;
function pokoloruj(mouseEvent: MouseEvent) {
  licznikKlikniec++;
  console.log(fibonacci(10 * licznikKlikniec));
  let cel = mouseEvent.target;
  let element = this as HTMLElement;


  let aktualnyKolor = window
  .getComputedStyle(element)
  .getPropertyValue('background-color');

  let [_,...koloryJakoTekst] =
      /rgb[a]?\((\d+),[^0-9]*(\d+),[^0-9]*(\d+)[,]?[^0-9]*(\d*)\)/
      .exec(aktualnyKolor);

  let colors: number[] = [];
  for(let i = 0; i < 3; i++) {
    colors[i] = (parseInt(koloryJakoTekst[i]) + 0x20) % 256;
  }

  element.style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
}

function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}
