let typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

// zusätzliche pokemon laden beim klicken auf den button
let limit = 40;
let step = 15;

function onloadFunc() {
  loadAllPokemon("/?limit=25&offset=0");
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"; // konstant von Anfang an definieren

async function loadAllPokemon(path = "") {
  // zusätzlicher pfad um auf z.B. name zuzugreifen
  let response = await fetch(BASE_URL + path + ".json"); // am Ende der url nach .json fragen, sonst gehts nicht!
  let responseJson = await response.json(); // wenn keine methode definiert, dann standard GET

  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (
    let indexPokemon = 0;
    indexPokemon < responseJson.results.length;
    indexPokemon++
  ) {
    let responsePokemon = await fetch(responseJson.results[indexPokemon].url);
    let responsePokemonJson = await responsePokemon.json();
    contentRef.innerHTML += getPokemonTemplate(responsePokemonJson);
  }
}

async function loadSelectedPokemon(id) {
  // zusätzlicher pfad um auf z.B. name zuzugreifen
  let responseSelectedPokemon = await fetch(BASE_URL + id); // am Ende der url nach .json fragen, sonst gehts nicht!
  let responseSelectedPokemonJson = await responseSelectedPokemon.json(); // wenn keine methode definiert, dann standard GET
  document.getElementById("overlay").innerHTML = getSelectedPokemonTemplate(
    responseSelectedPokemonJson
  );
  openOverlay();
}

function openOverlay() {
  document.getElementById("overlay").classList.remove("d-none");
}

function closeOverlay() {
  document.getElementById("overlay").classList.add("d-none");
}

// Event bubbling
function onclickProtection(event) {
  event.stopPropagation();
}

function showSpecStats() {
  document.getElementById("spects_main").classList.add("d-none");
  document.getElementById("spects_evo").classList.add("d-none");
  document.getElementById("spects_stats").classList.remove("d-none");
}

function showSpecEvo() {
  document.getElementById("spects_stats").classList.add("d-none");
  document.getElementById("spects_main").classList.add("d-none");
  document.getElementById("spects_evo").classList.remove("d-none");
}

function showSpecMain() {
  document.getElementById("spects_stats").classList.add("d-none");
  document.getElementById("spects_evo").classList.add("d-none");
  document.getElementById("spects_main").classList.remove("d-none");
}

function loadMorePokemon() {
  loadAllPokemon("/?limit=" + limit + "&offset=0");
  limit = limit + step;
}

async function searchPokemon(path = "/?limit=100000&offset=0") {
  let responseSearchPokemon = await fetch(BASE_URL + path);
  let responseSearchPokemonJson = await responseSearchPokemon.json();
  let inputValueRef = document.getElementById("input_search");
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  console.log("Eingabe: " + inputValueRef.value);

  let searchedPokemon = responseSearchPokemonJson.results.filter((pokemon) => {return pokemon.name.includes(inputValueRef.value);});

  for (let index = 0; index < searchedPokemon.length; index++) {
    console.log("Gefunden :" + searchedPokemon[index].name);

    contentRef.innerHTML += `<div>${searchedPokemon[index].name}</div>`;
  }
}
