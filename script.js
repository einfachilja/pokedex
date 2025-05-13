let limit = 30;
let step = 30;
let loadedPokemon = [];

function onloadFunc() {
  loadAllPokemon("/?limit=10000&offset=0");
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

async function loadAllPokemon(path = "") {
  let response = await fetch(BASE_URL + path);
  let responseJson = await response.json();

  loadedPokemon = responseJson.results;

  showSpinner();
  await renderAllPokemon(loadedPokemon);
  hideSpinner();
}

async function renderAllPokemon(loadedPokemon) {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (let indexPokemon = 0; indexPokemon < limit; indexPokemon++) {
    let responsePokemon = await fetch(loadedPokemon[indexPokemon].url);
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

    checkImageSrc(responseSearchedPokemonJSON);

    contentRef.innerHTML += getSearchedPokemonTemplate(
      responseSearchedPokemonJSON
    );
  }
}

async function loadSelectedPokemon(id) {
  let responseSelectedPokemon = await fetch(BASE_URL + id);
  let responseSelectedPokemonJson = await responseSelectedPokemon.json();
  document.getElementById("overlay").innerHTML = getSelectedPokemonTemplate(
    responseSelectedPokemonJson
  );
  openOverlay();

  // check if last pokemon reached
  if (id <= 1) {
    document.getElementById("previous_arrow").classList.add("d-none");
    document.getElementById("overlay-navigation").style.justifyContent =
      "flex-end";
  }
}

async function searchPokemon(path = "/?limit=10000&offset=0") {
  let responseSearchPokemon = await fetch(BASE_URL + path);
  let responseSearchPokemonJson = await responseSearchPokemon.json();
  let inputValueRef = document.getElementById("input_search");

  if (inputValueRef.value.length >= 3) {
    // hide button during search
    document.getElementById("button").classList.add("d-none");
    let searchedPokemon = responseSearchPokemonJson.results.filter((pokemon) =>
      pokemon.name
        .toLowerCase()
        .includes(inputValueRef.value.trim().toLowerCase())
    );
    renderSearchPokemon(searchedPokemon);
  } else if (inputValueRef.value.length == 0) {
    renderAllPokemon(loadedPokemon);
    document.getElementById("button").classList.remove("d-none");
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
  document.getElementById("spects_stats").classList.remove("d-none");
}

function showSpecMain() {
  document.getElementById("spects_stats").classList.add("d-none");
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

function nextPokemon(id) {
  id++;
  loadSelectedPokemon(id);
}

function previousPokemon(id) {
  id--;
  loadSelectedPokemon(id);
}

function checkImageSrc(responseSearchedPokemonJSON) {
  if (responseSearchedPokemonJSON.sprites.other.home.front_default == null) {
    responseSearchedPokemonJSON.sprites.other.home.front_default =
      "./assets/icons/favicon.png";
  }
}

async function loadMorePokemon() {
  limit = limit + step;
  showSpinner();
  await renderAllPokemon(loadedPokemon);
  hideSpinner();
}
