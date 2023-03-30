"use strict";

window.addEventListener("load", initApp);

async function initApp() {
  console.log("app initialized...");

  const allPokemons = await getPokeMons("https://cederdorff.github.io/dat-js/05-data/pokemons.json");

  allPokemons.sort(compareDexindex);
  //allPokemons.sort(compareName);
  for (const element of allPokemons) {
    showpokemons(element);
  }

  //***************SORTING STUFF***************\\
  // document.querySelector("#sort-allPokemons").addEventListener("change", sortChoice);

  // function sortChoice() {
  //   const sortSelection = this.value;

  //   sortPokemons(sortSelection);
  // }

  // function sortPokemons(sortSelection) {
  //   console.log("sorting function called");
  //   const previousPokemons = document.getElementById("#table-content");

  //   if (sortSelection === "dexindex") {
  //     console.log(sortSelection + " sorting selected");
  //     if (previousPokemons) {
  //       previousPokemons.remove();
  //     }
  //     for (const element of allPokemons.sort(compareDexindex)) {
  //       showpokemons(element);
  //     }
  //   } else if (sortSelection === "name") {
  //     console.log(sortSelection + " sorting selected");
  //     if (previousPokemons) {
  //       previousPokemons.remove();
  //     }
  //     for (const element of allPokemons.sort(compareName)) {
  //       showpokemons(element);
  //     }
  //   }
  // }
  //***************SORTING STUFF***************\\

  //allPokemons.forEach(showpokemons);

  //hardcoded fetch of pokemons
  // const trevenant = await getPokeMon("https://raw.githubusercontent.com/JonLundby/data-aflevering/main/trevenant.json");
  // console.log(trevenant);
  // showpokemons(trevenant);

  // const butterfree = await getPokeMon("https://raw.githubusercontent.com/Hamse-LibaaxMose/Pokemon-data-projekt/main/Pokemon.json");
  // console.log(butterfree);
  // showpokemons(butterfree);

  // const wattrel = await getPokeMon("https://raw.githubusercontent.com/PalleGregersJensen/Pokemon-projekt/main/data/wattrel.json");
  // console.log(wattrel);
  // showpokemons(wattrel);

  // const groudon = await getPokeMon(
  //   "https://raw.githubusercontent.com/OliKirk/Poke-Project-Object/main/data/pok%C3%A9mon.json?token=GHSAT0AAAAAAB6HFM3GYO32IIUDC3EB52NIZA4F3ZA"
  // );
  // console.log(groudon);
  // showpokemons(groudon);

  // const rayquaza = await getPokeMon("https://raw.githubusercontent.com/sebbex1337/Pokemon-app/main/rayquaza.json");
  // console.log(rayquaza);
  // showpokemons(rayquaza);
}

async function getPokeMons(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

function showpokemons(pokemon) {
  //console.log("showing pokemons...");

  correctGeneration(pokemon);
  correctSpilversion(pokemon);
  correctWeight(pokemon);

  const pokemonsTable = /*html*/ `
    <tbody id="table-content">
      <tr>
        <td>${pokemon.dexindex.toString().padStart(4, "0")}</td>
        <td>${pokemon.name}</td>
        <td><img src="${pokemon.image}"</td>
        <td>${pokemon.generation}</td>
        <td>${pokemon.spilversion}</td>
        <td>${pokemon.height}</td>
        <td>${pokemon.weight}</td>
        <td>${pokemon.gender}</td>
      </tr>

  `;

  document.querySelector("#pokemon-table").insertAdjacentHTML("beforeend", pokemonsTable);

  document.querySelector("#pokemon-table tbody:last-child").addEventListener("click", viewPokemon);
  document.querySelector("#dialog-close").addEventListener("click", closeView);

  function viewPokemon() {
    console.log("view pokemon clicked...");

    if (pokemon.subtype === null || pokemon.subtype === undefined || pokemon.subtype === "undefined" || pokemon.subtype === "") {
      pokemon.subtype = "none";
    }

    correctSpilversion(pokemon);
    correctCanEvolve(pokemon);

    document.querySelector("#dialog-image").src = `${pokemon.image}`;
    document.querySelector("#dialog-name").textContent = `Name: ${pokemon.name}`;
    document.querySelector("#dialog-generation").textContent = `Generation: ${pokemon.generation}`;
    document.querySelector("#dialog-spilversion").textContent = `Version: ${pokemon.spilversion}`;
    document.querySelector("#dialog-description").textContent = `Description: ${pokemon.description}`;
    document.querySelector("#dialog-type").textContent = `Type: ${pokemon.type}`;
    document.querySelector("#dialog-subtype").textContent = `Subtype: ${pokemon.subtype}`;
    document.querySelector("#dialog-canEvolve").textContent = `Evolve: ${pokemon.canEvolve}`;
    document.querySelector("#dialog-weaknesses").textContent = `Weaknesses: ${pokemon.weaknesses}`;
    document.querySelector("#dialog-ability").textContent = `Ability: ${pokemon.ability}`;
    document.querySelector("#dialog-footprint-image").src = `${pokemon.footprint}`;
    document.querySelector("#dialog-statsHP").textContent = `HP: ${pokemon.statsHP}`;
    document.querySelector("#dialog-statsAttack").textContent = `Attack: ${pokemon.statsAttack}`;
    document.querySelector("#dialog-statsDefence").textContent = `Defence ${pokemon.statsDefence}`;
    document.querySelector("#dialog-statsSpecialAttack").textContent = `Special attack: ${pokemon.statsSpecialAttack}`;
    document.querySelector("#dialog-statsSpecialDefence").textContent = `Special defence: ${pokemon.statsSpecialDefence}`;
    document.querySelector("#dialog-statsSpeed").textContent = `Speed: ${pokemon.statsSpeed}`;

    document.querySelector("#dialog-viewPokemon").showModal();
  }

  function closeView() {
    console.log("pokemon view closed...");
    document.querySelector("#dialog-viewPokemon").close();
  }
}

function correctSpilversion(pokemon) {
  if (pokemon.spilversion == "") {
    pokemon.spilversion = "Unkown";
  }
}

function correctGeneration(pokemon) {
  if (pokemon.generation == "" || pokemon.generation === undefined || pokemon.generation === "undefined" || pokemon.generation === null) {
    pokemon.generation = "Unkown";
  }
}

function correctWeight(pokemon) {
  pokemon.weight /= 1000;
}

function correctCanEvolve(pokemon) {
  if (pokemon.canEvolve) {
    pokemon.canEvolve = "Yes, I can evolve";
  } else {
    pokemon.canEvolve = "No, I can not evolve";
  }
}

function compareDexindex(a, b) {
  return a.dexindex - b.dexindex;
}

function compareName(a, b) {
  return a.name.localeCompare(b.name);
}
