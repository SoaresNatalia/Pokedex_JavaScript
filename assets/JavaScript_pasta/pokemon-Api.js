
const pokeApi= {}

function convertPokeApiParaClassPokemon(pokeDetail){
    
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    /*Pegando a lista de tipos dos Pokemons*/
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type= type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    /*Pegando a lista de abilidades dos Pokemons*/ 
    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)

    pokemon.weight = pokeDetail.weight

    return pokemon
}

pokeApi.getPokemonDetail = (pokemonApi) =>{

    /*Pokemon vem com o "name" e com a "url", estamos pegando a url e trnasformando o conteudo em Json*/
    return fetch(pokemonApi.url)
            .then((response) => response.json())
            .then(convertPokeApiParaClassPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    /* Interface de tratamento de uma Promise, parecido com Try - Cath*/
    return fetch(url)
        .then( (response) => response.json() ) /* Encadeamento de Then*/
        .then( (jsonBody) => jsonBody.results )
        .then( (pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then( (detailRequest) => Promise.all(detailRequest))
        .then( (pokemonDetails) => pokemonDetails)
}