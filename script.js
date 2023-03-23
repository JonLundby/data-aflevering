"use strict";

window.addEventListener("load", initApp);

async function initApp() {
  console.log("app initialized...");

  const trevenant = await getPokeMon("https://raw.githubusercontent.com/JonLundby/data-aflevering/main/trevenant.json");
  console.log(trevenant);
  showpokemons(trevenant);
}

async function getPokeMon(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

function showpokemons(pokemon) {
  console.log("showing pokemons...");

  const pokemonsTable = /*html*/ `
    <tbody>
      <tr>
        <td>${pokemon.name}</td>
        <td><img src="${pokemon.image}"</td>
        <td>${pokemon.generation}</td>
        <td>${pokemon.spilversion}</td>
        <td>${pokemon.height}</td>
        <td>${pokemon.weight}</td>
        <td>${pokemon.gender}</td>
      </tr>
    </tbody>
  `;
  document.querySelector("#pokemon-table").insertAdjacentHTML("beforeend", pokemonsTable);

  document.querySelector("#pokemon-table tbody:last-child").addEventListener("click", viewPokemon);

  function viewPokemon(pokemon) {
    console.log("view pokemon clicked...");

    const dialogListHTML = /*html*/ `
      <ul>
        <img src="${pokemon.image}">
        <li>Name: ${pokemon.name}</li>
        <li>Name: ${pokemon.generation}</li>
        <li>Name: ${pokemon.spilversion}</li>
        <li>Name: ${pokemon.statsHp}</li>
        <li>Name: ${pokemon.statsAttack}</li>
        <li>Name: ${pokemon.statsDefence}</li>
        <li>Name: ${pokemon.statsSpecialAttack}</li>
        <li>Name: ${pokemon.statsSpecialDefence}</li>
        <li>Name: ${pokemon.statsSpeed}</li>
      </ul>
    `;
    document.querySelector("#dialog-viewPokemon").showModal();

    document.querySelector("#dialog-viewPokemon").insertAdjacentHTML("beforeend", dialogListHTML);
    // document.querySelector("#dialog-close").addEventListener("click", closeView);

    // document.querySelector("#dialog-image").src = pokemon.image;
    // document.querySelector("#dialog-name").textContent = pokemon.name;
    // document.querySelector("#dialog-generation").textContent = pokemon.generation;
    // document.querySelector("#dialog-spilversion").textContent = pokemon.spilversion;
    // document.querySelector("#dialog-statsHP").textContent = pokemon.statsHp;
    // document.querySelector("#dialog-statsAttack").textContent = pokemon.statsAttack;
    // document.querySelector("#dialog-statsDefence").textContent = pokemon.statsDefence;
    // document.querySelector("#dialog-statsSpecialAttack").textContent = pokemon.statsSpecialAttack;
    // document.querySelector("#dialog-statsSpecialDefence").textContent = pokemon.statsSpecialDefence;
    // document.querySelector("#dialog-statsSpeed").textContent = pokemon.statsSpeed;
  }

  // function closeView() {
  //   console.log("pokemon view closed...");
  //   document.querySelector("#dialog-viewPokemon").close();
  // }
}
