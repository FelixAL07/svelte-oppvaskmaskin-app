# 🧼 Kjøkkenvakt Rotasjon

Dette prosjektet viser en roterende oversikt over hvem som har kjøkkenvakt i ulike uker. Rotasjonen foregår i par og endres annenhver uke.

## 📋 Hva gjør den?

- Viser en tabell med uke for uke hvem som har kjøkkenvakt.
- Rotasjonen starter i en gitt uke og går videre for hver `n` uke.
- Listen er laget basert på et forhåndsdefinert sett med par som kan endres i google sheets

## ⚙️ Konfigurasjon

Du kan justere disse verdiene i JavaScript-koden:

```js
let startWeek = 2; // Uken rotasjonen starter
let step = 2; // Hvor mange uker mellom hver ny rotasjon
let weeksToShow = 26; // Hvor mange uker frem i tid som vises
```

## 📊 Google Sheet

Du kan endre rekkefølgen på parene via dette <br>
[Google Sheetet](https://docs.google.com/spreadsheets/d/1txI624y3tUPdaykSLZeZmOXAFhRQzVRvUJSqzgP8qag/edit?usp=sharing).

## 👥 Par som roterer

Parene defineres i rekkefølgen de skal vises:

```js
let pairs = [
  { navn: "Vegar", navnTo: "Ragnar K" },
  { navn: "Asle", navnTo: "Fredrik" },
  { navn: "Simen", navnTo: "Håkon" },
  { navn: "Ingunn", navnTo: "Einar" },
  { navn: "Jørn Ivar", navnTo: "Lasse" },
  { navn: "Kristian B", navnTo: "Niels" },
  { navn: "Kjetil", navnTo: "Tarjei" },
  { navn: "Øyvind", navnTo: "Eldar" },
  { navn: "Lars", navnTo: "Kristian E" },
  { navn: "Simeon", navnTo: "Eyerusalem" },
];
```

## 🧽 Ansvarsoppgaver

Sette på oppvaskmaskin og rydde på plass. Tørke over kjøkkenbenk.

## 🖥️ Teknisk

Rotasjonen kalkuleres dynamisk basert på dagens uke.

Ukenumrene går i sirkel fra 1 til 52.

Koden er skrevet for bruk i et Svelte-prosjekt, men logikken kan gjenbrukes andre steder.
