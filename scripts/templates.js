function getPokemonTemplate(responsePokemonJson) {
    return `
        <div class="card" onclick="loadSelectedPokemon(${responsePokemonJson.id})">
            <div class="card-header">
                <span>#${responsePokemonJson.id}</span>
                <h2>${responsePokemonJson.name}</h2>
            </div>
            <div class="card-body ${responsePokemonJson.types[0].type.name}">
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
            <div class="card-body ${responseSelectedPokemonJson.types[0].type.name}">
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
                    ${responseSelectedPokemonJson.stats[0].stat.name}: ${responseSelectedPokemonJson.stats[0].base_stat}
                </div>
                  <div>
                    ${responseSelectedPokemonJson.stats[1].stat.name}: ${responseSelectedPokemonJson.stats[1].base_stat}
                </div>
                <div>
                   ${responseSelectedPokemonJson.stats[2].stat.name}: ${responseSelectedPokemonJson.stats[2].base_stat}
                </div>
                <div>
                    ${responseSelectedPokemonJson.stats[3].stat.name}: ${responseSelectedPokemonJson.stats[3].base_stat}
                </div>
                <div>
                    ${responseSelectedPokemonJson.stats[4].stat.name}: ${responseSelectedPokemonJson.stats[4].base_stat}
                </div>
                <div>
                    ${responseSelectedPokemonJson.stats[5].stat.name}: ${responseSelectedPokemonJson.stats[5].base_stat} 
                </div>
            </div>
            <div id="spects_evo" class="overlay-pokemon-specs d-none">
                <div>
                   
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
