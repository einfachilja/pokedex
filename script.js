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

function onloadFunc() {
  loadAllPokemon("/?limit=25&offset=0");
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"; // konstant von Anfang an definieren

async function loadAllPokemon(path = "") {
  // zusätzlicher pfad um auf z.B. name zuzugreifen
  let response = await fetch(BASE_URL + path + ".json"); // am Ende der url nach .json fragen, sonst gehts nicht!
  let responseJson = await response.json(); // wenn keine methode definiert, dann standard GET
  for (let indexPokemon = 0; indexPokemon < responseJson.results.length; indexPokemon++) {
    let responsePokemon = await fetch(responseJson.results[indexPokemon].url);
    let responsePokemonJson = await responsePokemon.json();
    document.getElementById("content").innerHTML += getPokemonTemplate(responsePokemonJson);
  }
}

async function loadSelectedPokemon(id) {// zusätzlicher pfad um auf z.B. name zuzugreifen
  let responseSelectedPokemon = await fetch(BASE_URL + id); // am Ende der url nach .json fragen, sonst gehts nicht!
  let responseSelectedPokemonJson = await responseSelectedPokemon.json(); // wenn keine methode definiert, dann standard GET
  document.getElementById('overlay').innerHTML = getSelectedPokemonTemplate(responseSelectedPokemonJson);
  openOverlay()
}

function openOverlay() {
    document.getElementById('overlay').classList.remove('d-none');
}

function closeOverlay() {
    document.getElementById('overlay').classList.add('d-none');
}

// Event bubbling
function onclickProtection(event) {
    event.stopPropagation();
}

