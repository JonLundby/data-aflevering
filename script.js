"use strict";

console.log("app is running...");

window.addEventListener("load", initApp);

async function initApp() {
  console.log("app initialized...");

  const pokemon = await getPokeMon("trevenant.json");
  console.log(pokemon);
  showpokemons(pokemon);
  
}

async function getPokeMon(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data
}

function showpokemons(pokemon) {
  console.log("showing pokemons...");
  document.querySelector("#pokemon-table").insertAdjacentHTML("beforeend", /*html*/ `
    <tr>
      <td>${pokemon.name}</td>
      <td><img src="${pokemon.image}"</td>
      <td>${pokemon.generation}</td>
      <td>${pokemon.spilversion}</td>
      <td>${pokemon.height}</td>
      <td>${pokemon.weight}</td>
      <td>${pokemon.gender}</td>
    </tr>
  `);

  document.querySelector("#pokemon-table tbody:last-child").addEventListener("click", viewPokemon);
  document.querySelector("#dialog-close").addEventListener("click", closeView)

  function viewPokemon(pokemon) {
    console.log("view pokemon clicked...");

    document.querySelector("#dialog-image").src = pokemon.image;
    document.querySelector("#dialog-name").textContent = pokemon.name;
    document.querySelector("#dialog-generation").textContent = pokemon.generation;
    document.querySelector("#dialog-spilversion").textContent = pokemon.spilversion;
    document.querySelector("#dialog-statsHP").textContent = pokemon.statsHp;
    document.querySelector("#dialog-statsAttack").textContent = pokemon.statsAttack;
    document.querySelector("#dialog-statsDefence").textContent = pokemon.statsDefence;
    document.querySelector("#dialog-statsSpecialAttack").textContent = pokemon.statsSpecialAttack;
    document.querySelector("#dialog-statsSpecialDefence").textContent = pokemon.statsSpecialDefence;
    document.querySelector("#dialog-statsSpeed").textContent = pokemon.statsSpeed;

    document.querySelector("#dialog-viewPokemon").showModal();
  }

  function closeView() {
    console.log("pokemon view closed...");
    document.querySelector("#dialog-viewPokemon").close();
  }
}
