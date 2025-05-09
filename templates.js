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
                <h2>${responsePokemonJson.types.map((item) => { return item.type.name}).join(" ")}</h2>
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
            <div class="overlay-card-footer">
                <h2>${responseSelectedPokemonJson.abilities.map((item) => { return item.ability.name}).join(" ")}</h2>
            </div>
            <div class="overlay-pokemon-specs-headline">
            <a onclick="showSpecMain()">main</a>
            <a  onclick="showSpecStats()">stats</a>
            <a onclick="showSpecEvo()">evo</a>
            </div>
            <div id="spects_main" class="overlay-pokemon-specs">
                <div>
                    Height: ${responseSelectedPokemonJson.height / 10 } m
                </div>
                  <div>
                    Weight: ${responseSelectedPokemonJson.weight / 10} kg
                </div>
                <div>
                    Base experience: ${responseSelectedPokemonJson.base_experience}
                </div>
                <div>
                    Abilities: ${responseSelectedPokemonJson.abilities.map((item) => { return item.ability.name }).join(' ')}
                </div>
            </div>
             <div id="spects_stats" class="overlay-pokemon-specs d-none">
                <div>
                    hp
                </div>
                  <div>
                    attack
                </div>
                <div>
                    defence
                </div>
                <div>
                    special-attack
                </div>
                <div>
                    special-defense
                </div>
                <div>
                    speed
                </div>
            </div>
            <div id="spects_evo" class="overlay-pokemon-specs d-none">
                <div>
                    1
                </div>
                <div>
                    2
                </div>
                <div>
                    3
                </div>
            </div>
        </div>`;
}
