let limit = 60;
let step = 30;

function onloadFunc() {
  loadAllPokemon("/?limit=30&offset=0");
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

async function loadAllPokemon(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  let responseJson = await response.json();

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

function loadMorePokemon() {
  loadAllPokemon("/?limit=" + limit + "&offset=0");
  limit = limit + step;
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
  if (responseSearchedPokemonJSON.sprites.other.home.front_default == null ) {
    responseSearchedPokemonJSON.sprites.other.home.front_default =
      "./assets/icons/favicon.png";
  }
}
