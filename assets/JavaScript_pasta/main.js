
const pokemonHtmlList = document.getElementById("pokemonListID")
const loadMoreButton = document.getElementById("loadMoreButton")
const modalAbilidades = document.getElementById("modalAbilidades")
const exampleModal = document.getElementById('exampleModal')


const limit = 10
let offset = 0
const maxReference = 151


function convertPokemonHtml(pokemon){
    return `    
                <li  class="pokemon ${pokemon.type}" id="modalAbilidades" data-bs-toggle="modal" data-bs-target="#pokeModal${pokemon.name}">
                    <span class="number">${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span> 

                    <div class="detail">

                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${pokemon.type}"> ${type} </li>`).join('')}
                        </ol>

                        <img src="${pokemon.photo}" alt=${pokemon.name}>

                    </div>

                    <div class="modal fade" id="pokeModal${pokemon.name}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content ${pokemon.type}">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">${pokemon.name}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                                <img src="${pokemon.photo}" alt=${pokemon.name}>

                                <div id="modalBodyType"">

                                    <p class="titulo"> Weight: ${pokemon.weight}</p>

                                    <p class="titulo"> Types: </p>
                                    <ol class="text">                                        
                                        ${pokemon.types.map((type) => `<li class="type ${pokemon.type}"> ${type} </li>`).join('')}
                                    </ol>

                                    <p class="titulo"> Abilities: </p>
                                    <ol class="text">                                        
                                        ${pokemon.abilities.map((ability) => `<li class="type ${pokemon.ability}"> ${ability} </li>`).join('')}
                                    </ol>                       

                                    
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>                            
                            </div>
                            </div>
                        </div>
                    </div>               
                    
                    
                    
                    
                </li>
                
                
              
           `
    
}            



function loadMorePokemons(offset, limit){
    pokeApi.getPokemons(offset, limit).then( (pokemonList = []) => {
        
        /* a função MAP vai receber uma função transformadora, que vai transformar a lista da API em HTML e concatenar em uma String,
        depois vai adiconar ao nosso Html a <li> de Pokemons*/        
        const pokemonHtml= pokemonList.map(convertPokemonHtml).join('')
        pokemonHtmlList.innerHTML += pokemonHtml
        
        //const detailHtml= pokemonList.map(novaPagDetail)
        
        
    })
}

loadMorePokemons(offset,limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdReferenceNextPage = offset + limit

    if(qtdReferenceNextPage >= maxReference){
        
        const newLimit = maxReference - offset
        loadMorePokemons(offset,newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else{
        loadMorePokemons(offset,limit)
    }
    
})


