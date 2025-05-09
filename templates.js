function getPokemonTemplate(responsePokemonJson) {
    return `
            <div class="card" onclick="loadSelectedPokemon(${responsePokemonJson.id})">
                <div class="card-header">
                    <span>#${responsePokemonJson.id}</span>
                    <h2>${responsePokemonJson.name}</h2>
                </div>
                <div class="card-body" style="background-color: ${typeColors[responsePokemonJson.types[0].type.name]}">
                    <img id="pokemon_img" class="pokemon-img"  src="${responsePokemonJson.sprites.other.home.front_default}">
                </div>
                <div class="card-footer">
                   <h2>${responsePokemonJson.abilities.map((item) => { return item.ability.name}).join(" ")}</h2>
                </div>
            </div>`;
}

function getSelectedPokemonTemplate(responseSelectedPokemonJson) {
    return `
    <div class="overlay-content" onclick="onclickProtection(event)">
    <div class="card-header">
                    <span>#${responseSelectedPokemonJson.id}</span>
                    <h2>${responseSelectedPokemonJson.name}</h2>
                </div>
                <div class="card-body" style="background-color: ${typeColors[responseSelectedPokemonJson.types[0].type.name]}">
                    <img id="pokemon_img" class="pokemon-img"  src="${responseSelectedPokemonJson.sprites.other.home.front_default}">
                </div>
                <div class="card-footer">
                   <h2>${responseSelectedPokemonJson.abilities.map((item) => { return item.ability.name}).join(" ")}</h2>
              
                </div>
                  <div>
                Height: ${responseSelectedPokemonJson.height}
                </div>
                  <div>
                Base experience: ${responseSelectedPokemonJson.base_experience}
                </div>
                  <div>
                Abilities: ${responseSelectedPokemonJson.abilities.map((item) => { return item.ability.name })}
                </div>
    </div>`;
}
