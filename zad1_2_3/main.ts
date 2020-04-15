let nowyElement = document.createElement('div');
nowyElement.textContent = "nowy element";
document.body.appendChild(nowyElement);


let pasazerZNajwiekszymId = znajdzPasazeraZNajwiekszymId();
console.log(dajImieINazwiskoPasazera(pasazerZNajwiekszymId));

setTimeout(() => {
  console.log('No już wreszcie.');
}, 2000);

function znajdzPasazeraZNajwiekszymId(): Element {
  let ol = document.querySelector('ol');
  let pasazerowie = ol.getElementsByClassName('pasazer');
  let maxIndeksPasazera = znajdzIndeksPasazeraZNajwiekszymId(pasazerowie);

  return pasazerowie[maxIndeksPasazera];
}

function znajdzIndeksPasazeraZNajwiekszymId(pasazerowie) {
  let maxIdPasazera: String = "";
  let maxIndeksPasazera = 0;

  for (let i = 0; i < pasazerowie.length; i++) {
    let idPasazera = pasazerowie[i].getAttribute('data-identyfikator-pasazera');

    if (idPasazera > maxIdPasazera) {
      maxIdPasazera = idPasazera;
      maxIndeksPasazera = i;
    }
  }

  return maxIndeksPasazera;
}

function dajImieINazwiskoPasazera(pasazerZNajwiekszymId): String {
  const imieINazwiskoRegex = "(.*) (.*)";

  return pasazerZNajwiekszymId
    .textContent
    .match(imieINazwiskoRegex)
    .shift();
}

teczoweKolory(document.querySelector('ol'));

function teczoweKolory(el: HTMLElement) {
  setTimeout(function () {
    console.log('red');
    el.style.backgroundColor = 'red';
    setTimeout(function() {
      el.style.backgroundColor = 'orange';
      setTimeout(function() {
        el.style.backgroundColor = 'yellow';
        setTimeout(function() {
          el.style.backgroundColor = 'green';
          setTimeout(function() {
            el.style.backgroundColor = 'blue';
            setTimeout(function() {
              el.style.backgroundColor = 'indigo';
              setTimeout(function() {
                el.style.backgroundColor = 'purple';
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}

// function poczekaj(waitTimeInMilis: number) {
//   return new Promise(resolve => setTimeout((resolve) =console.log("huj"), waitTimeInMilis));
// }

