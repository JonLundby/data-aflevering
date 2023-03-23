"use strict";

console.log("app is running...");

window.addEventListener("load", initApp);

async function initApp() {
  console.log("app initialized...");

  const pokemon = await getPokeMon("trevenant.json");

  showpokemons(pokemon);
  
}

async function getPokeMon(url) {
  const response = await fetch(url);
  const data = response.json();

  return data
}

function showpokemons(pokemon) {
  document.querySelector("#pokemon-table tbody").insertAdjacentHTML("beforeend", /*html*/ `
    <tr>
      <td>${pokemon.name}</td>
      <td><img src="${pokemon.image}"</td>
      <td>${pokemon.spilversion}</td>
      <td>${pokemon.generation}</td>
      <td>${pokemon.height}</td>
      <td>${pokemon.weight}</td>
      <td>${pokemon.gender}</td>
    </tr>
  `);
}
