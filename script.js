function onloadFunc() {
    loadData("/pokemon/?offset=0&limit=10");
}

const BASE_URL = "https://pokeapi.co/api/v2/";

async function loadData(path = "") {
    let response = await fetch(BASE_URL + path) // am Ende der url nach .json fragen, sonst gehts nicht!
    let responseJson = await response.json(); // wenn keine methode definiert, dann standard GET
    let results = responseJson.results;
    console.log(results); // ausloggen in console oder returnen und mit loadData() weiterarbeiten...

    for (let index = 0; index < results.length; index++) {
       
        document.getElementById('content').innerHTML += `
          <div>${results[index].name};</div>
        
        `;
        
      

    

    }

}
