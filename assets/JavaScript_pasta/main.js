
const pokemonHtmlList = document.getElementById("pokemonListID")
const loadMoreButton = document.getElementById("loadMoreButton")
const modalAbilidades = document.getElementById("modalAbilidades")
const exampleModal = document.getElementById('exampleModal')


const limit = 10
let offset = 0
const maxReference = 151


function convertPokemonHtml(pokemon){
    return `
                <li  class="pokemon ${pokemon.type}" id="modalAbilidades" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-heading="teste texto">
                    <span class="number">${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span> 

                    <div class="detail">

                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${pokemon.type}"> ${type} </li>`).join('')}
                        </ol>

                        <img src="${pokemon.photo}" alt=${pokemon.name}>

                    </div>              
                    
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content ${pokemon.type}">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>                            
                            </div>
                            </div>
                        </div>
                    </div>                  
                    
                    <script>
                        const myModal = document.querySelector('#exampleModal');
                        myModal.addEventListener('show.bs.modal', function (event) {
                            
                            const button = event.relatedTarget;
                            const heading = button.getAttribute('data-bs-heading');
                
                            // Set the value for the heading
                            const title = myModal.querySelector('.modal-header').textContent = heading;
                                
                        });
                    </script>
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


/*Transformando list de <li> em uma unica String
        const newHtml = newList.join('')

        pokemonHtmlList.innerHTML += newHtml*/




        /* Não precisamos usar o For
        for (let i = 0; i < pokemonList.length; i++) {
            const pokemon = pokemonList[i];            
            pokemonHtmlList.innerHTML += convertPokemonHtml(pokemon);            
        }*/