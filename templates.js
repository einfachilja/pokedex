function getPokemonTemplate(index, responseJson, imgSrc, type) {
    return `
            <div class="card">
                <div class="card-header">
                    <span>#${index + 1}</span>
                    <h2>${responseJson.results[index].name}</h2>
                </div>
                <div class="card-body" style="background-color: ${typeColors[type]}">
                    <img id="pokemon_img" class="pokemon-img"  src="${imgSrc}">
                </div>
                <div class="card-footer">
                   <h2>${type}</h2>
                </div>
            </div>`;
}