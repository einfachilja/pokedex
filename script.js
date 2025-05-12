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
  let responseJson = await response.json(); // wenn keine methode definiert, dann standard GE

  renderAllPokemon(responseJson);

}

async function renderAllPokemon(responseJson) {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

  for (let indexPokemon = 0; indexPokemon < responseJson.results.length; indexPokemon++) {
    let responsePokemon = await fetch(responseJson.results[indexPokemon].url);
    let responsePokemonJson = await responsePokemon.json();
    contentRef.innerHTML += getPokemonTemplate(responsePokemonJson);
  }
}

async function loadSelectedPokemon(id) {
  // zusätzlicher pfad um auf z.B. name zuzugreifen
  let responseSelectedPokemon = await fetch(BASE_URL + id); // am Ende der url nach .json fragen, sonst gehts nicht!
  let responseSelectedPokemonJson = await responseSelectedPokemon.json(); // wenn keine methode definiert, dann standard GET
  document.getElementById("overlay").innerHTML = getSelectedPokemonTemplate(responseSelectedPokemonJson);
  console.log(responseSelectedPokemonJson);
  
  openOverlay();
}

function openOverlay() {
  document.getElementById("overlay").classList.remove("d-none");
  document.getElementById("html").classList.add("overflow-hidden");

}

function closeOverlay() {
  document.getElementById("overlay").classList.add("d-none");
  document.getElementById("html").classList.remove("overflow-hidden");
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

  console.log("Eingabe: " , inputValueRef.value);

  let searchedPokemon = responseSearchPokemonJson.results
    .filter(pokemon => pokemon.name.toLowerCase().includes(inputValueRef.value.trim().toLowerCase()))
    .map(pokemon => ({
      name: pokemon.name,
      url: pokemon.url,
    }));

  console.log(searchedPokemon);

  // for (let i = 0; i < searchedPokemon.length; i++) {
  //   const responsePokemon = await fetch(searchedPokemon[i].url);
  //   const responsePokemonJson = await responsePokemon.json();

  //   contentRef.innerHTML += `
  //       <div class="card" onclick="loadSelectedPokemon(${responsePokemonJson.id})">
  //           <div class="card-header">
  //               <span>#${responsePokemonJson.id}</span>
  //               <h2>${responsePokemonJson.name}</h2>
  //           </div>
  //           <div class="card-body ${responsePokemonJson.types[0].type.name}">
  //              <img id="pokemon_img" class="pokemon-img"  src="${responsePokemonJson.sprites.other.home.front_default}">
  //           </div>
  //           <div class="card-footer">
  //               <h2>${responsePokemonJson.types.map((item) => { return item.type.name}).join(" ")}</h2>
  //           </div>
  //       </div>`;
  // }
}
