import pokemonDetail from '../pokemon-detail/pokemon-detail';

class PokemonListController {

    public pokemons: any[];
    public next: string;
    public pokemon;   
    public search;

    static $inject = ['$http'];

    constructor(public $http) {
        this.init();     
    }

    init() {
        this.$http.get('http://pokeapi.co/api/v1/pokemon/?limit=12')
            .then(response => {
                this.next = response.data.meta.next;
                this.pokemons = response.data.objects;
            });
    }

    loadMore() {
        this.$http.get(`http://pokeapi.co/${this.next}`)
            .then(response => {
                this.next = response.data.meta.next;
                this.pokemons = this.pokemons.concat(response.data.objects);
            });
    }
    
    setPokemon(pokemon){
         this.pokemon = pokemon;
    }
    
    filterByType = (item) =>{
           if(this.search)
                return item.types.some( f => { return f.name.indexOf(this.search) != -1; });
            else           
               return true;
       }
}

var PokemonListComponent = {
    controller: PokemonListController,
    controllerAs: 'vm',
    template: require('./pokemon-list.html')
};

export default angular.module('pokemon-list', [pokemonDetail])
    .component('pokemonList', PokemonListComponent)
    .name;