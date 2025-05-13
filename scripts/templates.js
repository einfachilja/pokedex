function getPokemonTemplate(responsePokemonJson) {
    return `
        <div id="card" class="card" onclick="loadSelectedPokemon(${responsePokemonJson.id})">
            <div class="card-header">
                <span>#${responsePokemonJson.id}</span>
                <h2>${(responsePokemonJson.name).charAt(0).toUpperCase() + (responsePokemonJson.name).slice(1)}</h2>
            </div>
            <div class="card-body bg_${responsePokemonJson.types[0].type.name}">
               <img id="pokemon_img" class="pokemon-img"  src="${responsePokemonJson.sprites.other.home.front_default}">
            </div>
            <div class="card-footer">
                <h2>  ${responsePokemonJson.types.map((item) => { return item.type.name}).join(" ")}</h2>
                <div class="grass"></div>
            </div>
        </div>`;
}

function getSelectedPokemonTemplate(responseSelectedPokemonJson) {
    return `
        <div class="overlay-content" onclick="onclickProtection(event)">
            <div class="card-header">
                <span>#${responseSelectedPokemonJson.id}</span>
                <h2>${(responseSelectedPokemonJson.name).charAt(0).toUpperCase() + (responseSelectedPokemonJson.name).slice(1)}</h2>
            </div>
            <div class="card-body bg_${responseSelectedPokemonJson.types[0].type.name}">
                <img id="pokemon_img" class="pokemon-img"  src="${responseSelectedPokemonJson.sprites.other.home.front_default}">
            </div>
            <div class="overlay-card-footer">
                <h2>${responseSelectedPokemonJson.abilities.map((item) => { return item.ability.name}).join(" ")}</h2>
            </div>
            <div class="overlay-pokemon-specs-headline">
                <a onclick="showSpecMain()">main</a>
                <a onclick="showSpecStats()">stats</a>
            </div>
            <div id="spects_main" class="overlay-pokemon-specs">
                <div class="main"><div class="main-title">height</div> <div>: ${responseSelectedPokemonJson.height / 10 } m</div></div>
                <div class="main"><div class="main-title">weight</div> <div>: ${responseSelectedPokemonJson.weight / 10} kg</div></div>
                <div class="main"><div class="main-title">base experience</div> <div>: ${responseSelectedPokemonJson.base_experience}</div></div>
                <div class="main"><div class="main-title">abilities</div> <div>: ${responseSelectedPokemonJson.abilities.map((item) => { return item.ability.name }).join(' ')}</div></div>
            </div>
            <div id="spects_stats" class="overlay-pokemon-specs d-none">
                <div class="stats">${responseSelectedPokemonJson.stats[0].stat.name} <div class="stat-bar"><div class="stat-bar-fill" style="width: ${(responseSelectedPokemonJson.stats[0].base_stat) / 255 * 100 }%;"></div></div></div>
                <div class="stats">${responseSelectedPokemonJson.stats[1].stat.name} <div class="stat-bar"><div class="stat-bar-fill" style="width: ${(responseSelectedPokemonJson.stats[1].base_stat) / 255 * 100 }%;"></div></div></div>
                <div class="stats">${responseSelectedPokemonJson.stats[2].stat.name} <div class="stat-bar"><div class="stat-bar-fill" style="width: ${(responseSelectedPokemonJson.stats[2].base_stat) / 255 * 100 }%;"></div></div></div>
                <div class="stats">${responseSelectedPokemonJson.stats[3].stat.name} <div class="stat-bar"><div class="stat-bar-fill" style="width: ${(responseSelectedPokemonJson.stats[3].base_stat) / 255 * 100 }%;"></div></div></div>
                <div class="stats">${responseSelectedPokemonJson.stats[4].stat.name} <div class="stat-bar"><div class="stat-bar-fill" style="width: ${(responseSelectedPokemonJson.stats[4].base_stat) / 255 * 100 }%;"></div></div></div>
                <div class="stats">${responseSelectedPokemonJson.stats[5].stat.name} <div class="stat-bar"><div class="stat-bar-fill" style="width: ${(responseSelectedPokemonJson.stats[5].base_stat) / 255 * 100 }%;"></div></div></div>
            </div>
            <div id="overlay-navigation" class="overlay-navigation">
                <img id="previous_arrow" src="./assets/icons/previous.png" onclick="previousPokemon(${responseSelectedPokemonJson.id})">
                <img id="next_arrow" src="./assets/icons/next.png" onclick="nextPokemon(${responseSelectedPokemonJson.id})">
            </div>
        </div>`;
}
