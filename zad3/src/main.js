// niestety uzywam polskiego w kodze :/
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function zaloguj() {
    var komunikaty = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        komunikaty[_i] = arguments[_i];
    }
    console.log.apply(console, __spreadArrays(["Ależ skomplikowany program!"], komunikaty));
}
zaloguj("Ja", "cię", "nie", "mogę");
var jsonString = "{\n    \"piloci\": [\n        \"Pirx\",\n        \"Exupery\",\n        \"Idzikowski\",\n        \"G\u0142\u00F3wczewski\"\n    ],\n    \"lotniska\": {\n        \"WAW\": [\"Warszawa\", [3690, 2800]],\n        \"NRT\": [\"Narita\", [4000, 2500]],\n        \"BQH\": [\"Biggin Hill\", [1802, 792]],\n        \"LBG\": [\"Paris-Le Bourget\", [2665, 3000, 1845]]\n    }\n}";
function sprawdzDaneLiniiLotniczej(dane) {
    var pola = ["piloci", "lotniska"];
    var sparsowaneDane = JSON.parse(dane);
    return sprawdzCzyDaneMajaPola(sparsowaneDane, pola)
        && sprawdzPoprawnoscPilotow(sparsowaneDane)
        && sprawdzPoprawnoscLotnisk(sparsowaneDane);
}
function sprawdzCzyDaneMajaPola(dane, pola) {
    for (var _i = 0, pola_1 = pola; _i < pola_1.length; _i++) {
        var pole = pola_1[_i];
        if (pole in dane == false) {
            return false;
        }
    }
    return true;
}
function sprawdzPoprawnoscPilotow(dane) {
    return sprawdzCzyPoleJestTablicaDanegoTypu(dane.piloci, "string");
}
function sprawdzPoprawnoscLotnisk(dane) {
    for (var lotnisko in dane.lotniska) {
        if (sprawdzPoprwnoscKrotekWLotnisku(dane.lotniska[lotnisko]) == false) {
            return false;
        }
    }
    return true;
}
function sprawdzPoprwnoscKrotekWLotnisku(dane) {
    return sprawdzCzyPoleJestTablica(dane)
        && dane.length == 2
        && sprawdzCzyPoleJestDanegoTypu(dane[0], "string")
        && sprawdzCzyPoleJestTablicaDanegoTypu(dane[1], "number");
}
function sprawdzCzyPoleJestTablicaDanegoTypu(dane, typ) {
    return sprawdzCzyPoleJestTablica(dane)
        && sprawdzCzyKazdePoleJestDanegoTypu(dane, typ);
}
function sprawdzCzyKazdePoleJestDanegoTypu(dane, typ) {
    for (var _i = 0, dane_1 = dane; _i < dane_1.length; _i++) {
        var pole = dane_1[_i];
        if (sprawdzCzyPoleJestDanegoTypu(pole, typ) == false) {
            return false;
        }
    }
    return true;
}
function sprawdzCzyPoleJestDanegoTypu(pole, typ) {
    return typeof pole == typ;
}
function sprawdzCzyPoleJestTablica(pole) {
    return pole instanceof Array;
}
// =================================================================================
// testy
// dane do testow
var jsonStringPilociPolylkaWNazwie = "{\n    \"piloc\": [\n        \"Pirx\",\n        \"Exupery\",\n        \"Idzikowski\",\n        \"G\u0142\u00F3wczewski\"\n    ],\n    \"lotniska\": {\n        \"WAW\": [\"Warszawa\", [3690, 2800]],\n        \"NRT\": [\"Narita\", [4000, 2500]],\n        \"BQH\": [\"Biggin Hill\", [1802, 792]],\n        \"LBG\": [\"Paris-Le Bourget\", [2665, 3000, 1845]]\n    }\n}";
var jsonStringLotniskaPolylkaWNazwie = "{\n    \"piloci\": [\n        \"Pirx\",\n        \"Exupery\",\n        \"Idzikowski\",\n        \"G\u0142\u00F3wczewski\"\n    ],\n    \"lotnisk\": {\n        \"WAW\": [\"Warszawa\", [3690, 2800]],\n        \"NRT\": [\"Narita\", [4000, 2500]],\n        \"BQH\": [\"Biggin Hill\", [1802, 792]],\n        \"LBG\": [\"Paris-Le Bourget\", [2665, 3000, 1845]]\n    }\n}";
var jsonStringPilociPolylkaWPolu = "{\n    \"piloci\": [\n        \"Pirx\",\n        1,\n        \"Idzikowski\",\n        \"G\u0142\u00F3wczewski\"\n    ],\n    \"lotniska\": {\n        \"WAW\": [\"Warszawa\", [3690, 2800]],\n        \"NRT\": [\"Narita\", [4000, 2500]],\n        \"BQH\": [\"Biggin Hill\", [1802, 792]],\n        \"LBG\": [\"Paris-Le Bourget\", [2665, 3000, 1845]]\n    }\n}";
var jsonStringLotniskaPolylkaWKrotce1 = "{\n    \"piloci\": [\n        \"Pirx\",\n        \"Exupery\",\n        \"Idzikowski\",\n        \"G\u0142\u00F3wczewski\"\n    ],\n    \"lotniska\": {\n        \"WAW\": [37, [3690, 2800]],\n        \"NRT\": [\"Narita\", [4000, 2500]],\n        \"BQH\": [\"Biggin Hill\", [1802, 792]],\n        \"LBG\": [\"Paris-Le Bourget\", [2665, 3000, 1845]]\n    }\n}";
var jsonStringLotniskaPolylkaWKrotce2 = "{\n    \"piloci\": [\n        \"Pirx\",\n        \"Exupery\",\n        \"Idzikowski\",\n        \"G\u0142\u00F3wczewski\"\n    ],\n    \"lotniska\": {\n        \"WAW\": [\"Warszawa\", [\"hey\", 2800]],\n        \"NRT\": [\"Narita\", [4000, 2500]],\n        \"BQH\": [\"Biggin Hill\", [1802, 792]],\n        \"LBG\": [\"Paris-Le Bourget\", [2665, 3000, 1845]]\n    }\n}";
var jsonStringLotniskaPolylkaWKrotce3 = "{\n    \"piloci\": [\n        \"Pirx\",\n        \"Exupery\",\n        \"Idzikowski\",\n        \"G\u0142\u00F3wczewski\"\n    ],\n    \"lotniska\": {\n        \"WAW\": [\"Warszawa\", [\"hey\", 2800], 2],\n        \"NRT\": [\"Narita\", [4000, 2500]],\n        \"BQH\": [\"Biggin Hill\", [1802, 792]],\n        \"LBG\": [\"Paris-Le Bourget\", [2665, 3000, 1845]]\n    }\n}";
// "odpalanie" testow
function sprawdzDaneTest(dane, oczekiwanaOdpowiedz, wiadomoscDlaBledu) {
    if (sprawdzDaneLiniiLotniczej(dane) != oczekiwanaOdpowiedz) {
        console.error(wiadomoscDlaBledu);
    }
}
sprawdzDaneTest(jsonStringPilociPolylkaWNazwie, false, "nazwa `pilot`");
sprawdzDaneTest(jsonStringLotniskaPolylkaWNazwie, false, "nazwa `lotniska`");
sprawdzDaneTest(jsonStringPilociPolylkaWPolu, false, "pole `pilot`");
sprawdzDaneTest(jsonStringLotniskaPolylkaWKrotce1, false, "krotka 1 `lotniska`");
sprawdzDaneTest(jsonStringLotniskaPolylkaWKrotce2, false, "krotka 2 `lotniska`");
sprawdzDaneTest(jsonStringLotniskaPolylkaWKrotce3, false, "krotka 3 `lotniska`");
