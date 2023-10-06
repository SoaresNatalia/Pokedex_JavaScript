const infosPoke = document.getElementById('infosPoke')

const detailPoke= {}

function novaPagDetail(pokemon){

    return `<p>${pokemon.name}</p>
    `

 }           



detailPoke.novaPagPoke = (number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`

    infosPoke.innerHTML += `<a href="https://pokeapi.co/api/v2/pokemon/${number}">clique</a>`
    /* Interface de tratamento de uma Promise, parecido com Try - Cath*/
    return fetch(url)
        .then( (response) => response.json() ) /* Encadeamento de Then*/
        .then( (jsonBody) => jsonBody.results )
        /*.then( (pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then( (detailRequest) => Promise.all(detailRequest))
        .then( (pokemonDetails) => pokemonDetails)*/
}



function verificaPoke(number){
    detailPoke.novaPagPoke(number).then( (pokemonList = []) => {
        
        /* a função MAP vai receber uma função transformadora, que vai transformar a lista da API em HTML e concatenar em uma String,
        depois vai adiconar ao nosso Html a <li> de Pokemons*/        
        //const detailHtml= pokemonList.map(novaPagDetail)
        //infosPoke.innerHTML += detailHtml
        
        //const detailHtml= pokemonList.map(novaPagDetail)
        
        
    })
}





