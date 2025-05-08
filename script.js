let typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
};

function onloadFunc() {
    loadPokemon("/pokemon?limit=13&offset=0");
}

const BASE_URL = "https://pokeapi.co/api/v2/"; // konstant von Anfang an definieren

async function loadPokemon(path = "") { // zusätzlicher pfad um auf z.B. name zuzugreifen
    let response = await fetch(BASE_URL + path + ".json") // am Ende der url nach .json fragen, sonst gehts nicht!
    let responseJson = await response.json(); // wenn keine methode definiert, dann standard GET

    for (let index = 0; index < responseJson.results.length; index++) {

        let responseImg = await fetch(responseJson.results[index].url)
        let responseImgJson = await responseImg.json();
        let imgSrc = responseImgJson.sprites.other.home.front_default;
        let type = responseImgJson.types[0].type.name;

        document.getElementById('content').innerHTML += getPokemonTemplate(index, responseJson, imgSrc, type);
    }
}