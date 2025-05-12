// zusätzliche pokemon laden beim klicken auf den button
let limit = 60;
let step = 30;

function onloadFunc() {
  loadAllPokemon("/?limit=30&offset=0");
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"; // konstant von Anfang an definieren

async function loadAllPokemon(path = "") {
  let response = await fetch(BASE_URL + path + ".json"); // am Ende der url nach .json fragen, sonst gehts nicht!
  let responseJson = await response.json(); // wenn keine methode definiert, dann standard GE

  showSpinner();

  await renderAllPokemon(responseJson);

  hideSpinner();
}

async function renderAllPokemon(responseJson) {
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

async function renderSearchPokemon(searchedPokemon) {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (let i = 0; i < searchedPokemon.length; i++) {
    let responseSearchedPokemon = await fetch(searchedPokemon[i].url);
    let responseSearchedPokemonJSON = await responseSearchedPokemon.json();
    contentRef.innerHTML += getSearchedPokemonTemplate(
      responseSearchedPokemonJSON
    );
  }
}

async function loadSelectedPokemon(id) {
  let responseSelectedPokemon = await fetch(BASE_URL + id); // am Ende der url nach .json fragen, sonst gehts nicht!
  let responseSelectedPokemonJson = await responseSelectedPokemon.json(); // wenn keine methode definiert, dann standard GET
  document.getElementById("overlay").innerHTML = getSelectedPokemonTemplate(
    responseSelectedPokemonJson
  );
  // loadEvolutionChain(id);
  openOverlay();
}

async function searchPokemon(path = "/?limit=10000&offset=0") {
  let responseSearchPokemon = await fetch(BASE_URL + path);
  let responseSearchPokemonJson = await responseSearchPokemon.json();
  let inputValueRef = document.getElementById("input_search");

  if (inputValueRef.value.length >= 3) {
    console.log("Eingabe: ", inputValueRef.value);
    let searchedPokemon = responseSearchPokemonJson.results.filter((pokemon) =>
      pokemon.name
        .toLowerCase()
        .includes(inputValueRef.value.trim().toLowerCase())
    );
    renderSearchPokemon(searchedPokemon);
  } else if (inputValueRef.value.length == 0) {
    console.log("LEER");
    loadAllPokemon("/?limit=25&offset=0");
  }
}

function showSpinner() {
  document.getElementById("spinner").classList.remove("d-none");
  document.getElementById("content").classList.add("d-none");
  document.getElementById("button").classList.add("d-none");
}

function hideSpinner() {
  document.getElementById("spinner").classList.add("d-none");
  document.getElementById("content").classList.remove("d-none");
  document.getElementById("button").classList.remove("d-none");
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

function openOverlay() {
  document.getElementById("overlay").classList.remove("d-none");
  document.getElementById("html").classList.add("overflow-hidden");
}

function closeOverlay() {
  document.getElementById("overlay").classList.add("d-none");
  document.getElementById("html").classList.remove("overflow-hidden");
}

function onclickProtection(event) {
  event.stopPropagation();
}

function loadMorePokemon() {
  loadAllPokemon("/?limit=" + limit + "&offset=0");
  limit = limit + step;
}