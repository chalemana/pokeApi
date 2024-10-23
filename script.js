let listaPokemon = [];

// obtiene la lista completa de Pokémon
function obtenerListaCompleta() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1302')
        .then(response => response.json())
        .then(data => {
            listaPokemon = data.results;
        })
        .catch(error => console.error('Error:', error));
}

// muestra sugerencias en el buscador
function mostrarSugerencias() {
    let input = document.getElementById('pokemon-search').value.toLowerCase();
    let sugerencias = document.getElementById('sugerencias');
    sugerencias.innerHTML = '';

    if (input.length === 0) return;

    listaPokemon
        .filter(pokemon => pokemon.name.includes(input))
        .slice(0, 6) // muestra los primeros 6 pokemones que se ajustan a tu busqueda
        .forEach(pokemon => {
            let sugerenciasItem = document.createElement('div');
            sugerenciasItem.textContent = pokemon.name;
            sugerenciasItem.classList.add('sugerencias');
            sugerenciasItem.onclick = () => seleccionarPokemon(pokemon.url);
            sugerencias.appendChild(sugerenciasItem);
        });
}

// obtiene los detalles del Pokémon seleccionado
function seleccionarPokemon(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('name').textContent = data.name;
            document.getElementById('height').textContent = data.height;
            document.getElementById('weight').textContent = data.weight;
            document.getElementById('sugerencias').innerHTML = '';
            document.getElementById('pokemon-search').value = '';
        })
        .catch(error => console.error('Error:', error));
}

// obtener la lista completa de Pokémon al cargar la página
obtenerListaCompleta();